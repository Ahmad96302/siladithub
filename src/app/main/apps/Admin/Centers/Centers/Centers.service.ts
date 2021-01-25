import { Center } from './../Center/Center.model';
import {  centersApi } from './../../../../../../URL_API';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CentersService implements Resolve<any>
{
    Centers: any[];
    onCentersChanged: BehaviorSubject<any>;

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
        this.onCentersChanged = new BehaviorSubject({});
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
                this.getCenters()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Centers
     *
     * @returns {Promise<any>}
     */
    getCenters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(centersApi)
                .subscribe((response: any) => {
                    this.Centers = response;
                    this.onCentersChanged.next(this.Centers);
                    resolve(response);
                }, reject);
        });
    }

    async DeleteCenter(Center): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.delete(centersApi + Center.id)
                .subscribe(() => {
                    const contactIndex = this.Centers.indexOf(Center);
                    this.Centers.splice(contactIndex, 1);
                    this.onCentersChanged.next(this.Centers);
                    resolve();
                },reject);
        });
    }
}
