import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../../authentication/Auth/auth.service';
import { userDetails } from './../../../../../Modules/userDetails';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Profileimage } from './../../../../../../URL_API';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileTimelineComponent implements OnInit, OnDestroy {
    timeline: any;
    infoForm: FormGroup;


    // Private
    private _unsubscribeAll: Subject<any>;
    private userDetails: userDetails;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private http: HttpClient,
        private _formBuilder: FormBuilder,
        private AuthService: AuthService,
        private _matSnackBar: MatSnackBar

    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.userDetails = AuthService.userDetails();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._profileService.timelineOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(timeline => {
                this.timeline = timeline;
            });
        this.infoForm = this.createinfoForm();

    }
    createinfoForm(): FormGroup {
        return this._formBuilder.group({
            phone: [this.userDetails.phoneNumber],
            location: [this.userDetails.location],
        });

    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    saveinfo(): void {

        const data = this.infoForm.getRawValue();



        this._profileService.updateinfo(data)
            .then(() => {

                // Trigger the subscription with new data
                this._profileService.aboutOnChanged.next(data);

                // Show the success message
                this._matSnackBar.open('User information Updated', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            });
    }
}
