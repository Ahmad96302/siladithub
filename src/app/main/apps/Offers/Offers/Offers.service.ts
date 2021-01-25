import { OffersApi, myOfferApi } from './../../../../../URL_API';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class OffersService implements Resolve<any>
{
    Offers: any[];
    onOffersChanged: BehaviorSubject<any>;

    token : any = sessionStorage.getItem('key');
    option = {headers : {'content-Type' : 'application/json' , Authorization : 'Bearer ' + this.token }};
    /**
     * Constructor 
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onOffersChanged = new BehaviorSubject({});
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
                this.getOffers()
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
            this._httpClient.get(myOfferApi,this.option)
                .subscribe((response: any) => {
                    this.Offers = response;
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

    
}
