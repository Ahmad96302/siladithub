import { Profileimage } from './../../../../URL_API';
import { ProfileService } from './profile.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { userDetails } from './../../../Modules/userDetails';
import { AuthService } from './../authentication/Auth/auth.service';
import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent
{
    /**
     * Constructor
     */
    public progress: number;
    public message: string;
    userDetails:userDetails;
    countOffers:number;
    countOrders:number;
    successOffers:number;
    successOrders:number;

    constructor(private AuthService: AuthService,private http: HttpClient ,private _ProfileService:ProfileService )
    {
        this.userDetails =this.AuthService.userDetails();
        this.getcounts();
    }

    public uploadFile = (files) => {
        if (files.length === 0) {
          return;
        
        }
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        let token = sessionStorage.getItem('key');
        formData.append('file', fileToUpload, fileToUpload.name);

        this.http.post(Profileimage,formData,{reportProgress: true,headers:{'Authorization' :'Bearer '+token}, observe: 'events' })
        .subscribe((event:any) => {
            try{
                if(event.body.message){
                    sessionStorage.setItem('avatar',event.body.message)
                }
            }
            catch(ex){

            }
          });
    
    }
  async  getcounts(){
     await   this._ProfileService.getcount5().subscribe((response:any) =>{
        this.countOffers = response.countOffers;
        this.countOrders = response.countOrders;
        this.successOffers = response.successOffers;
        this.successOrders = response.successOrders;
     })
    }
  
}
