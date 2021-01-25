import { Router } from '@angular/router';
import { userResponse } from './../../../../Modules/userResponse';
import { AuthService } from './../Auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { SingleSeries } from '@swimlane/ngx-charts';
import { SignalRService } from '@fuse/services/signal-r.service';

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;
    messageError:string;
    messageHide:boolean;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private AuthService:AuthService,
        private Router:Router,
        private signalRService:SignalRService

    )
    {
        this.messageHide=true;
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
   async SiniIn(){
        await this.AuthService.login(this.loginForm.value).subscribe(( userResponse : userResponse ) =>{
            sessionStorage.setItem('key',userResponse.jwtToken);
            sessionStorage.setItem('avatar',userResponse.avatar);
            sessionStorage.setItem('id',userResponse.id+'');
            this.Router.navigate(['/sample']);
        },error => {           
                this.messageHide=false;
                this.messageError=error['error']['message'];
        });


    }
  async  SinginWithGoogle(){
       await  this.AuthService.signInWithGoogle();
               
    }
  async  SinginWithFacebook(){
        await this.AuthService.signInWithFB();
    }
}
