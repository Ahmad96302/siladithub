import { centersApi, citiesApi } from './../../../../../../URL_API';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CenterService implements Resolve<any>
{
    routeParams: any;
    Center: any;
    onCenterChanged: BehaviorSubject<any>;
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
        this.onCenterChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCenter(),
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
     * Get Center
     *
     * @returns {Promise<any>}
     */
    getCenter(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onCenterChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(centersApi + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.Center = response;
                        this.onCenterChanged.next(this.Center);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save Center
     *
     * @param Center
     * @returns {Promise<any>}
     */
    saveCenter(Center): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put(centersApi+ Center.id, Center)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add Center
     *
     * @param Center
     * @returns {Promise<any>}
     */
    addCenter(Center): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post(centersApi, Center)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
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
}
