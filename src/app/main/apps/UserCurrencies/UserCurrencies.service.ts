import { CurrencisApi } from './../../../../URL_API';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserCurrenciesService implements Resolve<any>
{
    currencies: any[];
    oncurrenciesChanged: BehaviorSubject<any>;

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
        this.oncurrenciesChanged = new BehaviorSubject({});
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
                this.getcurrencies()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get currencies
     *
     * @returns {Promise<any>}
     */
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
}
