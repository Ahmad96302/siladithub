import { Router } from '@angular/router';
import { AuthService } from './../../../pages/authentication/Auth/auth.service';
import { userDetails } from './../../../../Modules/userDetails';
import { Center } from './../../Admin/Centers/Center/Center.model';
import { userResponse } from './../../../../Modules/userResponse';
import { City } from './../../Admin/City/City/City.model';
import { offer, offerType } from './Offermodel';
import { OfferuserService } from './Offer.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { locale as english } from './../../../../i18n/en';
import { locale as turkish } from './../../../../i18n/tr';

@Component({
    selector     : 'Admin-Offer',
    templateUrl  : './Offer.component.html',
    styleUrls    : ['./Offer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OfferComponent implements OnInit, OnDestroy
{
    
    pageType: string;
    OfferForm: FormGroup;
    cities:City[];
    centers:Center[];
    Offer: offer;
    public User: userResponse;
    // Private
    private _unsubscribeAll: Subject<any>;
    UserDetails:userDetails;
    public exampleData: any;
    /**
     * Constructor
     *
     * @param {OfferService} _OfferService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _OfferService: OfferuserService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private authsL:AuthService,
        private Router:Router
        ,  private _fuseTranslationLoaderService: FuseTranslationLoaderService,

    )
    {
        this.UserDetails=authsL.userDetails();
        // Set the default
        this.Offer = new offer();
        this.cities=_OfferService.Cities;
        this.centers=_OfferService.centers;
        this.exampleData=_OfferService.codes;
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
        this._OfferService.onOfferChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(Offer => {

                if ( Offer )
                {
                    this.Offer = new offer(Offer);
                    this.Router[('sample')]
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.Offer = new offer();
                }

                this.OfferForm = this.createOfferForm();
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
    createOfferForm(): FormGroup
    {
        return this._formBuilder.group({
            id               : [this.Offer.id],
            userId           : [this.Offer.userId],
            Amount           : [this.Offer.amount],
            cityId            :[this.Offer.cityId],
            centerId          :[this.Offer.centerId],
            location          :[this.Offer.location],
            offerType         :[this.Offer.offerType],
            currency:          [this.Offer.currency]
        });
    }
    getcenters(id:number)
    {
      
        this._OfferService.getcityCenters(id) .then(() => {
            this.centers=this._OfferService.centers;
        });
    }
    /**
     * Save Offer
     */
    saveOffer(): void
    {
        const data = this.OfferForm.getRawValue();
             data.offerType=0;
             data.userId=this.UserDetails.id

        this._OfferService.saveOffer(data)
            .then(() => {
              
                // Trigger the subscription with new data
                this._OfferService.onOfferChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Offer saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
            this.Router.navigateByUrl('/apps/Offer/Offers');

    }

    /**
     * Add Offer
     */
    addOffer(): void
    {
        const data = this.OfferForm.getRawValue();
        data.userId=this.UserDetails.id
        data.offerType=0;
        this._OfferService.addOffer(data)
            .then(() => {
                // Trigger the subscription with new data
                this._OfferService.onOfferChanged.next(data);
                
                // Show the success message
                this._matSnackBar.open('Offer added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
                
                // Change the location with new one
            });
            this.Router.navigateByUrl('/apps/Offer/Offers');

    }
}
