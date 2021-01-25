import { SignalRService } from '@fuse/services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { myOfferAccepted } from './../../../../URL_API';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { userDetails } from './../../../Modules/userDetails';
import { AuthService } from './../../../main/pages/authentication/Auth/auth.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';

@Component({
    selector     : 'toolbar',
    templateUrl  : './toolbar.component.html',
    styleUrls    : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    notfi:any;
    hidenotfi:boolean;
    countNotfiy:number;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private AuthService:AuthService,
        private _httpClient: HttpClient,
        private signalRService:SignalRService,
        private _ngZone: NgZone,
    )
    {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon : 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon : 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon : 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon : 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon : 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'ar',
                title: 'Arabic',
                flag : 'ar'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
      userDetails:userDetails;

    ngOnInit(): void
    {
        //  this.userDetails =this.AuthService.userDetails();
        if(sessionStorage.getItem('key')){
            this.userDetails =this.AuthService.userDetails();
            this.myOfferAccepted();
            this.subscribeToEventsOffer();

            }
            else{
                this.userDetails = new userDetails('','','','','','','','','')
            }
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});
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
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;
        localStorage.setItem('lang',lang.id)
        // Use the selected language for translations
        this._translateService.use(lang.id);
    }
    logout(){
        this.AuthService.logout();
        location.reload();
    }
    token : any = sessionStorage.getItem('key');

    option = {headers : { 'Authorization' : 'Bearer ' + this.token }};

    async myOfferAccepted(){
        this._httpClient.get(myOfferAccepted,this.option).subscribe((response:any) =>{
            this.notfi=response;
            if(this.notfi == null){
                this.hidenotfi = false
            }else{
                this.countNotfiy = this.notfi.length;
            }      
        })
    }
    private subscribeToEventsOffer(): void {  
        this.signalRService.newNotfiy.subscribe((message1: any) => {  
          this._ngZone.run(() => { 
              console.log(message1);
              this.notfi.push(message1);  
              if(this.notfi == null){
                this.hidenotfi = false
            }else{
                this.countNotfiy = this.notfi.length;
            } 
          });  
        });  
      }
}
