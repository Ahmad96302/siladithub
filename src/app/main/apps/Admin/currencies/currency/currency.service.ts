import { CurrencisApi, CurrencyCodesApi } from './../../../../../../URL_API';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class currencyService implements Resolve<any>
{
    routeParams: any;
    currency: any;
    oncurrencyChanged: BehaviorSubject<any>;

    codes: any[];
    onCodesChanged: BehaviorSubject<any>;

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
        this.oncurrencyChanged = new BehaviorSubject({});
        this.onCodesChanged = new BehaviorSubject({});

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
                this.getcurrency(),
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
     * Get currency
     *
     * @returns {Promise<any>}
     */
    getcurrency(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.oncurrencyChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(CurrencisApi + this.routeParams.id,this.option)
                    .subscribe((response: any) => {
                        this.currency = response;
                        this.oncurrencyChanged.next(this.currency);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save currency
     *
     * @param currency
     * @returns {Promise<any>}
     */
    savecurrency(currency): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(CurrencisApi + currency.id, currency,this.option)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add currency
     *
     * @param currency
     * @returns {Promise<any>}
     */
    addcurrency(currency): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(CurrencisApi, currency,this.option)
                .subscribe((response: any) => {
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
