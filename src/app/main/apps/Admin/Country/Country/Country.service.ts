import { Api, CountriesApi } from './../../../../../../URL_API';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CountryService implements Resolve<any>
{
    routeParams: any;
    Country: any;
    onCountryChanged: BehaviorSubject<any>;

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
        this.onCountryChanged = new BehaviorSubject({});
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
                this.getCountry()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Country
     *
     * @returns {Promise<any>}
     */
    getCountry(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onCountryChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(CountriesApi + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.Country = response;
                        this.onCountryChanged.next(this.Country);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save Country
     *
     * @param Country
     * @returns {Promise<any>}
     */
    saveCountry(Country): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(CountriesApi + Country.id, Country)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Country
     *
     * @param Country
     * @returns {Promise<any>}
     */
    addCountry(Country): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(CountriesApi, Country)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
