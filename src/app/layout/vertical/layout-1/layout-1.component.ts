import { userDetails } from './../../../Modules/userDetails';
import { AuthService } from './../../../main/pages/authentication/Auth/auth.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';

@Component({
    selector     : 'vertical-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    user:userDetails
    userRole:string
    constructor(
        private _fuseConfigService: FuseConfigService,
        private AuthService:AuthService
    )
    {

        if(sessionStorage.getItem('key'))
        {
            this.user=this.AuthService.userDetails();
            // Set the defaults
            this.userRole=this.user.role;
            this.navigation = navigation;
            this.navigation.forEach((element,index) => {
                if(element.role == 'Admin' && this.userRole == 'User'){
                    this.navigation.splice(index,1);
                }  
            });
        }else{
            this.user = new userDetails('','','','','','','','','')

        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
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
}
