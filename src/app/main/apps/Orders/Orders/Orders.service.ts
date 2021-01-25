import { GetOrders } from './../../../../../URL_API';
import { OffersApi, myOfferApi } from '../../../../../URL_API';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class OrdersService implements Resolve<any>
{
    Orders: any[];
    onOrdersChanged: BehaviorSubject<any>;

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
        this.onOrdersChanged = new BehaviorSubject({});
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
                this.GetOrders()
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
    GetOrders(): Promise<any>
    {
        
        return new Promise((resolve, reject) => {
            this._httpClient.get(GetOrders,this.option)
                .subscribe((response: any) => {
                    this.Orders = response;
                    this.onOrdersChanged.next(this.Orders);
                    resolve(response);
                }, reject);
        });
    }

    async DeleteOrder(Offer): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.delete(OffersApi + Offer.id,this.option)
                .subscribe(() => {
                    const contactIndex = this.Orders.indexOf(Offer);
                    this.Orders.splice(contactIndex, 1);
                    this.onOrdersChanged.next(this.Orders);
                    resolve();
                },reject);
        });
    }
}
