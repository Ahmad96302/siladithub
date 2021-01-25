import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { Country } from 'app/main/apps/Admin/Country/Country/Country.model';
import { CountryService } from 'app/main/apps/Admin/Country/Country/Country.service';
import { locale as english } from './../../../../../i18n/en';
import { locale as turkish } from './../../../../../i18n/tr';
@Component({
    selector     : 'Admin-Country',
    templateUrl  : './Country.component.html',
    styleUrls    : ['./Country.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CountryComponent implements OnInit, OnDestroy
{
    Country: Country;
    pageType: string;
    CountryForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CountryService} _ecommerceCountryService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _CountryService: CountryService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,

    )
    {
        // Set the default
        this.Country = new Country();

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
        // Subscribe to update Country on changes
        this._CountryService.onCountryChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(country => {

                if ( country )
                {
                    this.Country = new Country(country);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.Country = new Country();
                }

                this.CountryForm = this.createCountryForm();
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
    createCountryForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.Country.id],
            name            : [this.Country.name],
            handle          : [this.Country.handle],
    
        });
    }

    /**
     * Save Country
     */
    saveCountry(): void
    {
        const data = this.CountryForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._CountryService.saveCountry(data)
            .then(() => {

                // Trigger the subscription with new data
                this._CountryService.onCountryChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Country saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add Country
     */
    addCountry(): void
    {
        const data = this.CountryForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._CountryService.addCountry(data)
            .then(() => {

                // Trigger the subscription with new data
                this._CountryService.onCountryChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Country added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('apps/Admin/Countries/' + this.Country.id + '/' + this.Country.handle);
            });
    }
}
