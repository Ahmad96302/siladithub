import { currency } from './currency.model';
import { currencyService } from './currency.service';
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
    selector     : 'Admin-currency',
    templateUrl  : './currency.component.html',
    styleUrls    : ['./currency.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class currencyComponent implements OnInit, OnDestroy
{
    currency: currency;
    pageType: string;
    currencyForm: FormGroup;
    exampleData :any;
    // Private
    private _unsubscribeAll: Subject<any>;
    
    /**
     * Constructor
     *
     * @param {currencyService} _currencyService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _currencyService: currencyService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService

    )
    {
        // Set the default
        this.currency = new currency();
       this.exampleData=_currencyService.codes;
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
        this._currencyService.oncurrencyChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(Currency => {

                if ( Currency )
                {
                    this.currency = new currency(Currency);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.currency = new currency();
                }

                this.currencyForm = this.createcurrencyForm();
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
    createcurrencyForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.currency.id],
            handle          : [this.currency.handle],
            code             : [this.currency.code],
            order         : [this.currency.order],
        });
    }

    /**
     * Save currency
     */
    savecurrency(): void
    {
        const data = this.currencyForm.getRawValue();
        this._currencyService.savecurrency(data)
            .then(() => {

                // Trigger the subscription with new data
                this._currencyService.oncurrencyChanged.next(data);

                // Show the success message
                this._matSnackBar.open('currency saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add currency
     */
    addcurrency(): void
    {
        const data = this.currencyForm.getRawValue();

        this._currencyService.addcurrency(data)
            .then(() => {

                // Trigger the subscription with new data
                this._currencyService.oncurrencyChanged.next(data);

                // Show the success message
                this._matSnackBar.open('currency added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('apps/Admin/currencys/' + this.currency.id + '/' + this.currency.handle);
            });
    }
}
