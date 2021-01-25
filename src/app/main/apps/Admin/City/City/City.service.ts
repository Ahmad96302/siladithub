import { Api, CountriesApi, citiesApi, header } from './../../../../../../URL_API';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CityService implements Resolve<any>
{
    routeParams: any;
    City: any;
    onCityChanged: BehaviorSubject<any>;
    countries: any[];
    oncountriesChanged: BehaviorSubject<any>;
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
        this.oncountriesChanged = new BehaviorSubject({});
        this.onCityChanged = new BehaviorSubject({});
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
                this.getCity(),
                this.getcountries()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get City
     *
     * @returns {Promise<any>}
     */
    getCity(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onCityChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(Api+'api/cities/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.City = response;
                        this.onCityChanged.next(this.City);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save City
     *
     * @param City
     * @returns {Promise<any>}
     */
    saveCity(City): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(citiesApi + City.id, City,)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add City
     *
     * @param City
     * @returns {Promise<any>}
     */
    addCity(City): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(citiesApi, City)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
        
    }
    getcountries(): Promise<any>
    { 
        return new Promise((resolve, reject) => {
            this._httpClient.get(CountriesApi,header)
                .subscribe((response: any) => {
                    this.countries = response;
                    this.oncountriesChanged.next(this.countries);
                    resolve(response);
                }, reject);
        });
    }

}
