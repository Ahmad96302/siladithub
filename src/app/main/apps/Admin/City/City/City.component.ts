import { countriesService } from './../../Country/Countries/countries.service';
import { Country } from './../../Country/Country/Country.model';
import { CityService } from './City.service';
import { City } from './City.model';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { locale as english } from './../../../../../i18n/en';
import { locale as turkish } from './../../../../../i18n/tr';

@Component({
    selector     : 'Admin-City',
    templateUrl  : './City.component.html',
    styleUrls    : ['./City.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CityComponent implements OnInit, OnDestroy
{
    City: City;
    pageType: string;
    CityForm: FormGroup;
    countries: Country[];
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CityService} _CityService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _CityService: CityService,
        
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,

    )
    {
        // Set the default
        this.City = new City();
        this.countries=this._CityService.countries;
      
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update city on changes
        this._CityService.onCityChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(city => {

                if ( city )
                {
                    this.City = new City(city);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.City = new City();
                }

                this.CityForm = this.createCityForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create Country form
     *
     * @returns {FormGroup}
     */
    createCityForm(): FormGroup
    {  
        return this._formBuilder.group({
            id              : [this.City.id],
            name            : [this.City.name],
            handle          : [this.City.handle],
            countryId         : [this.City.countryId]
        });
    }

    /**
     * Save City
     */
    saveCity(): void
    {
    
        const data = this.CityForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        
    
       
        this._CityService.saveCity(data)
            .then(() => {

                // Trigger the subscription with new data
                this._CityService.onCityChanged.next(data);

                // Show the success message
                this._matSnackBar.open('City saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add City
     */
    addCity(): void
    {
    
        const data = this.CityForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        data.id=0;


        this._CityService.addCity(data)
            .then(() => {

                // Trigger the subscription with new data
                this._CityService.onCityChanged.next(data);

                // Show the success message
                this._matSnackBar.open('City added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('apps/Admin/Cities/' + this.City.id + '/' + this.City.handle);
            });
    }
}
