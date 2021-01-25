import { OfferView } from './../../Modules/offerView';
import { currency } from './../apps/Admin/currencies/currency/currency.model';
import { UserCurrenciesService } from './../apps/UserCurrencies/UserCurrencies.service';
import { offerType } from './../apps/Offers/Offer/Offermodel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AcceptOffers, Api, chatsInsertforRequest } from './../../../URL_API';
import { MessageForCreationDto } from './../../Modules/MessageForCreationDto';
import { userDetails } from './../../Modules/userDetails';
import { AuthService } from './../pages/authentication/Auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from './../apps/Admin/Country/Country/Country.model';
import { DataSource } from '@angular/cdk/collections';
import { FuseUtils } from './../../../@fuse/utils/index';
import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GetOffersR } from './../../Modules/GetOffersR';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import {  Subject, Observable, merge, BehaviorSubject, fromEvent } from 'rxjs';
import { locale as english } from './../../i18n/en';
import { locale as turkish } from './../../i18n/tr';
import { offersService } from './services/Offers.service';
import { SignalRService } from '@fuse/services/signal-r.service';
import { Center } from '../apps/Admin/Centers/Center/Center.model';
import { Pipe, PipeTransform } from '@angular/core';




@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements OnInit
{

 /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {OfferService} _OfferService
     */ 
    dataSource: FilesDataSource | null;
    displayedColumns = [ "UserName",'Amount','currency','Type','Country','city','center','Request'];
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;
  
    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

    offers:GetOffersR[];
    form: FormGroup;

    countires:Country[];
    centers:Center[];
    UserDetails:userDetails
    private _unsubscribeAll: Subject<any>;
    currencies:currency[];

    Allcurrencies:currency[];

     lang:any;
  constructor(
      private _fuseTranslationLoaderService: FuseTranslationLoaderService,
      private _formBuilder: FormBuilder,
      private _OfferService:offersService ,
      private signalRService:SignalRService,
      private _matSnackBar: MatSnackBar,
      private authsL:AuthService,
      private mat:MatSnackBar,
      private Router:Router,
      private HttpClient:HttpClient,
      private _ngZone: NgZone,

  )
  {     

    this.lang=localStorage.getItem("lang")
    this.UserDetails=authsL.userDetails();
    this.countires=_OfferService.Countries;
    this.centers=_OfferService.centers;
    this.currencies=_OfferService.currencies;
    this.Allcurrencies=_OfferService.Allcurrencies;
    //  this.GetOffersAll = this.getOffers();
    //this.GetOffersAll = this.getOffersfun();
      this._unsubscribeAll = new Subject();
      this.form = this._formBuilder.group({

          Amount      :['', Validators.required],
          CityId      : ['', Validators.required],
          CenterId   : ['', Validators.required],
          userId:      []
      });
      this._fuseTranslationLoaderService.loadTranslations(english, turkish);
      
  }


  getcenters(id:number)
{
    
    this._OfferService.getcityCenters(id) .then(() => {
        this.centers=this._OfferService.centers;
    });
}
    
  ngOnInit(): void
  {
  
      this.dataSource = new FilesDataSource(this._OfferService, this.paginator, this.sort);

      fromEvent(this.filter.nativeElement, 'keyup')
          .pipe(
              takeUntil(this._unsubscribeAll),
              debounceTime(150),
              distinctUntilChanged()
          )
          .subscribe(() => {
              if ( !this.dataSource )
              {
                  return;
              }

              this.dataSource.filter = this.filter.nativeElement.value;
          });
          this.subscribeToEventsOffer();
  }
  private subscribeToEventsOffer(): void {  
    this.signalRService.OfferReceived.subscribe((message1: any) => {  
      this._ngZone.run(() => {  
          location.reload();
      });  
    });  
  }
async getOffersfun(){
     (await this._OfferService.getOffers()).subscribe((GetOffersApi : GetOffersR[]) =>{
        this.offers=GetOffersApi;
  
    });
}

AddOffer(){
    const data = this.form.getRawValue();
    data.userId=this.UserDetails.id
    this._OfferService.addOffer(data)
        .then(() => {

            // Trigger the subscription with new data
            this._OfferService.onOffersChanged.next(data);

            // Show the success message
            this._matSnackBar.open('offer added', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });

        });
}
MessageForCreation:MessageForCreationDto;
OfferView1:OfferView;
userDetails:userDetails;
token :string = sessionStorage.getItem('key');
async Request(x,accountID,offer){
     var option = {  'headers': {
         'Authorization': 'Bearer ' + this.token,
         'Content-Type': 'application/json'
       }}; 
     (await this._OfferService.AcceptOffer(x))
     .subscribe((respons) => 
     {

        if(respons['message']=='your request is approved'){
            var offers=[{'accepterName': this.UserDetails.fullName,'acepted': false,'acepterId': 8,'amount':offer.amount,'center': null,'centerId': null,'city': null,'cityId': 0,'country': null,'countryName': null,'currency': null,'id': 1068,'location': null,offerType: 0,'status': 0,'userId': 1,'username': "ahmad Khalil"}]
            this.OfferView1 = new OfferView(1,'',2,'',this.UserDetails.fullName,'','',1,offer.amount,1,'','','',true)
            this.signalRService.sendRequset(this.OfferView1,+accountID);
            this.mat.open(respons['message'],"Ok" , {verticalPosition:'top' , duration:2000})
            this.MessageForCreation= new MessageForCreationDto(accountID,+this.UserDetails.id,this.UserDetails.fullName,'انا مهتم بالطلب التحويل الذي قمت بعرضه','2021-08-02',null);
            
           ( this.HttpClient.post(chatsInsertforRequest,this.MessageForCreation,option)).subscribe(respons=>{})
           

        } 
        else{
            
            this.mat.open(respons['message'],"Ok" , {verticalPosition:'top' , duration:2000})
        }
     });
     this.Router.navigateByUrl('/apps/chat');
}
}


export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {EcommerceProductsService} _ecommerceProductsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _OffersService: offersService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._OffersService.Offers;
      
 
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._OffersService.onOffersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._OffersService.Offers.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
       
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
   
}