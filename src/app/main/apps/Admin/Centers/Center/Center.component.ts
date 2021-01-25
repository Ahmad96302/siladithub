import { City } from './../../City/City/City.model';
import { Center } from './Center.model';
import { CenterService } from './Center.service';
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
    selector     : 'Admin-Center',
    templateUrl  : './Center.component.html',
    styleUrls    : ['./Center.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CenterComponent implements OnInit, OnDestroy
{
    Center: Center;
    pageType: string;
    CenterForm: FormGroup;
    cities:City[]
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CenterService} _CenterService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _CenterService: CenterService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,

    )
    {
        // Set the default
        this.Center = new Center();
        this.cities=_CenterService.Cities;
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
        this._CenterService.onCenterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(center => {

                if ( center )
                {
                    this.Center = new Center(center);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.Center = new Center();
                }

                this.CenterForm = this.createCenterForm();
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
    createCenterForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.Center.id],
            name            : [this.Center.name],
            handle          : [this.Center.handle],
            cityId          : [this.Center.cityId]
        });
    }

    /**
     * Save Center
     */
    saveCenter(): void
    {
        const data = this.CenterForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._CenterService.saveCenter(data)
            .then(() => {

                // Trigger the subscription with new data
                this._CenterService.onCenterChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Center saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add Center
     */
    addCenter(): void
    {
        const data = this.CenterForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._CenterService.addCenter(data)
            .then(() => {

                // Trigger the subscription with new data
                this._CenterService.onCenterChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Center added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('apps/Admin/Centers/' + this.Center.id + '/' + this.Center.handle);
            });
    }
}
