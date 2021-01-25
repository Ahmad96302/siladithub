import { Country } from 'app/main/apps/Admin/Country/Country/Country.model';
import { Api, CountriesApi } from './../../../../../../URL_API';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class countriesService implements Resolve<any>
{
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
     * Get products
     *
     * @returns {Promise<any>}
     */
    getcountries(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(CountriesApi)
                .subscribe((response: any) => {
                    this.countries = response;
                    this.oncountriesChanged.next(this.countries);
                    resolve(response);
                }, reject);
        });
    }

    async Deletecountry(Country): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.delete(CountriesApi + Country.id)
                .subscribe(() => {
                    const contactIndex = this.countries.indexOf(Country);
                    this.countries.splice(contactIndex, 1);
                    this.oncountriesChanged.next(this.countries);
                    resolve();
                },reject);
        });
    }
}
