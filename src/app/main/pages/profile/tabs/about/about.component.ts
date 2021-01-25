import { MessageForCreationDto } from './../../../../../Modules/MessageForCreationDto';
import { HttpClient } from '@angular/common/http';
import { RateComponent } from './Rate/Rate.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuseUtils } from './../../../../../../@fuse/utils/index';
import { GetOffersR } from './../../../../../Modules/GetOffersR';
import { userDetails } from './../../../../../Modules/userDetails';
import { AuthService } from './../../../authentication/Auth/auth.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subject, merge, Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { offer } from 'app/main/apps/Offers/Offer/Offermodel';
import { MatDialog } from '@angular/material/dialog';
import { chatsInsertforRequest } from 'URL_API';

@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy
{
    about: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'Amount','Country','Type','city','center','Success','Close','State'];
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;
     date: Date = new Date();  

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private AuthService: AuthService,
        private _ProfileService:ProfileService ,
        private mat:MatSnackBar,
        private dialog:MatDialog,
        private HttpClient:HttpClient,

    )
    {
        this.getOffersfun();
        this.UserDetails=AuthService.userDetails();
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    offers:offer[];
    MessageForCreation:MessageForCreationDto;
    UserDetails:userDetails;
  async CloseOffer(id){
(await this._ProfileService.CloseOffer(id).subscribe((respons) =>{
    this.mat.open(respons['message'],"Ok" , {verticalPosition:'top' , duration:2000})
   
}));
location.reload();
    }
    token :string = sessionStorage.getItem('key');
 async  SuccessOffer(id,acepterId){
    var option = {  'headers': {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }}; 
     this.dialog.open(RateComponent,{data:{acepterId:acepterId}}).afterClosed().subscribe(result => 
        ( this._ProfileService.SuccessOffer(id).subscribe((respons) =>{
            this.mat.open(respons['message'],"Ok" , {verticalPosition:'top' , duration:2000})
            this.MessageForCreation= new MessageForCreationDto(acepterId,+this.UserDetails.id,this.UserDetails.fullName,'لقد تم قبول العرض','2021-08-02',null);
            
            ( this.HttpClient.post(chatsInsertforRequest,this.MessageForCreation,option)).subscribe(respons=>{})
            location.reload();
        }
        
        ))
        );

    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    userDetails:userDetails;

    ngOnInit(): void
    {
        this.userDetails =this.AuthService.userDetails();

        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
            });

            this.dataSource = new FilesDataSource(this._ProfileService, this.paginator, this.sort);


    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    async getOffersfun(){
          
           this.offers=this._ProfileService.Offers;
           this.offers.forEach(element => {
            if(element.status == '0')
            {
                element.status = 'open';
            }
            else if(element.status == '1'){
                element.status = 'prossing';
            }
            else if(element.status == '2'){
                element.status = 'sucess';
            }
            else{
                element.status = 'out of time';
            }      
           });
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
        private _ProfileService: ProfileService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();
        this.filteredData = this._ProfileService.Offers;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._ProfileService.onOffersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                    
                        let data = this._ProfileService.Offers.slice();

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