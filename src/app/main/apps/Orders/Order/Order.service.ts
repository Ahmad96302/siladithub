import { CurrencyCodesApi } from './../../../../../URL_API';
import { OffersApi, citycentersApi } from '../../../../../URL_API';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { centersApi,citiesApi } from 'URL_API';

@Injectable()
export class OrderuserService implements Resolve<any>
{
    routeParams: any;
    Offer: any;
    onOfferChanged: BehaviorSubject<any>;
    
    Cities: any[];
    onCitiesChanged: BehaviorSubject<any>;

    centers: any[];
    oncentersChanged: BehaviorSubject<any>;


    codes: any[];
    onCodesChanged: BehaviorSubject<any>;


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    token : any = sessionStorage.getItem('key');
    option = {headers : {'content-Type' : 'application/json' , Authorization : 'Bearer ' + this.token }};

    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onOfferChanged = new BehaviorSubject({});
        this.onCitiesChanged = new BehaviorSubject({});
        this.oncentersChanged=new BehaviorSubject({});
        this.onCodesChanged= new BehaviorSubject({});
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
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getOffer(),
                this.getCities(),
                this.getCenters(),
                this.GetCods()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Offer
     *
     * @returns {Promise<any>}
     */
    getOffer(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onOfferChanged.next(false);
                resolve(false);
            }
            else
            {
               
                this._httpClient.get(OffersApi + this.routeParams.id,this.option)
                    .subscribe((response: any) => {
                        this.Offer = response;
                        this.onOfferChanged.next(this.Offer);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save Offer
     *
     * @param Offer
     * @returns {Promise<any>}
     */
    saveOffer(Offer): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.put(OffersApi+ Offer.id, Offer,this.option)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Offer
     *
     * @param Offer
     * @returns {Promise<any>}
     */
    addOffer(Offer): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(OffersApi, Offer,this.option)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
    getCities(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(citiesApi,this.option)
                .subscribe((response: any) => {
                    this.Cities = response;
                    this.onCitiesChanged.next(this.Cities);
                    resolve(response);
                }, reject);
        });
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
    GetCods(){
        return new Promise((resolve, reject) => {
            this._httpClient.get(CurrencyCodesApi,this.option)
                .subscribe((response: any) => {
                    this.codes = response;
                    this.onCodesChanged.next(this.codes);
                    resolve(response);
                }, reject);
        });
          
       }
}
