import { AuthService } from './../../pages/authentication/Auth/auth.service';
import { userDetails } from './../../../Modules/userDetails';
import { myOfferApi, OffersApi, centersApi, CountriesApi, AcceptOffer1, citycentersApi, CurrencisApi, CurrencyCodesApi, AllCurrencisApi } from './../../../../URL_API';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class offersService implements Resolve<any>
{
    Offers: any[];
    onOffersChanged: BehaviorSubject<any>;
   


    currencies: any[];
    oncurrenciesChanged: BehaviorSubject<any>;

      
    Allcurrencies: any[];
    AlloncurrenciesChanged: BehaviorSubject<any>;


    Countries: any[];
    onCountriesChanged: BehaviorSubject<any>;
  
    centers: any[];
    oncentersChanged: BehaviorSubject<any>;
    token : any = sessionStorage.getItem('key');
    option = {headers : {'content-Type' : 'application/json' , Authorization : 'Bearer '+ this.token }};
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private AuthService:AuthService
    )
    {
        // Set the defaults
        this.userDetails=this.AuthService.userDetails();
        this.onOffersChanged = new BehaviorSubject({});
        this.oncentersChanged=  new BehaviorSubject({});
        this.onCountriesChanged=  new BehaviorSubject({});
        this.oncurrenciesChanged=  new BehaviorSubject({});
        this.AlloncurrenciesChanged= new BehaviorSubject({});

    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */

     
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getOffers(),
                this.getCenters(),
                this.getCountries(),
                this.getcurrencies(),
                this.getAllcurrencies()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Offers
     *
     * @returns {Promise<any>}
     */
    getOffers(): Promise<any>
    {
        
        return new Promise((resolve, reject) => {
            this._httpClient.get(OffersApi,this.option)
                .subscribe((response: any) => {
                    this.Offers = response;
                    this.Offers.forEach(element => {
                        if(element.offerType == 0)
                        {
                            element.offerType = 'offer';
                        }
                        else if(element.offerType == 1){
                            element.offerType = 'Order';
                        }     
                       });
                    this.onOffersChanged.next(this.Offers);
                    resolve(response);
                }, reject);
        });
    }

    async DeleteOffer(Offer): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.delete(OffersApi + Offer.id,this.option)
                .subscribe(() => {
                    const contactIndex = this.Offers.indexOf(Offer);
                    this.Offers.splice(contactIndex, 1);
                    this.onOffersChanged.next(this.Offers);
                    resolve();
                },reject);
        });
    }

    getCountries(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(CountriesApi,this.option)
                .subscribe((response: any) => {
                    this.Countries = response;
                    this.onCountriesChanged.next(this.Countries);
                    resolve(response);
                }, reject);
        });
    }
    getCenters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(centersApi,this.option)
                .subscribe((response: any) => {
                    this.centers = response;
                    this.oncentersChanged.next(this.centers);
                    resolve(response);
                }, reject);
        });
    }
    addOffer(Offer): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(OffersApi, Offer,this.option)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    userDetails:userDetails
    AcceptOffer(id){

       
          return  this._httpClient.post(AcceptOffer1,id ,this.option);
 
          
     }
     getcityCenters(id): Promise<any>
     {
         return new Promise((resolve, reject) => {
             this._httpClient.get(citycentersApi+id,this.option)
                 .subscribe((response: any) => {
                     this.centers = response;
                     this.oncentersChanged.next(this.centers);
                     resolve(response);
                 }, reject);
         });
     }


     getcurrencies(): Promise<any>
     {
         return new Promise((resolve, reject) => {
             this._httpClient.get(CurrencisApi,this.option)
                 .subscribe((response: any) => {
                     this.currencies = response;
                     this.oncurrenciesChanged.next(this.currencies);
                     resolve(response);
                 }, reject);
         });
     }
     getAllcurrencies(): Promise<any>
     {
         return new Promise((resolve, reject) => {
             this._httpClient.get(AllCurrencisApi,this.option)
                 .subscribe((response: any) => {
                     this.Allcurrencies = response;
                     this.AlloncurrenciesChanged.next(this.Allcurrencies);
                     resolve(response);
                 }, reject);
         });
     }
     

}
