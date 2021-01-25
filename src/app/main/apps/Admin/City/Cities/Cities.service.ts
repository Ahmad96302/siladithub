import { Api, citiesApi } from './../../../../../../URL_API';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CitiesService implements Resolve<any>
{
    Cities: any[];
    onCitiesChanged: BehaviorSubject<any>;

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
        this.onCitiesChanged = new BehaviorSubject({});
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
                this.getCities()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Cities
     *
     * @returns {Promise<any>}
     */
    getCities(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(citiesApi)
                .subscribe((response: any) => {
                    this.Cities = response;
                    this.onCitiesChanged.next(this.Cities);
                    resolve(response);
                }, reject);
        });
    }
 

    async DeleteCity(City): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.delete(citiesApi + City.id)
                .subscribe(() => {
                    const contactIndex = this.Cities.indexOf(City);
                    this.Cities.splice(contactIndex, 1);
                    this.onCitiesChanged.next(this.Cities);
                    resolve();
                },reject);
        });
    }
  
}
