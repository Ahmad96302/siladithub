import { GetFullNmae, postRates } from './../../../../../../../URL_API';
import { userDetails } from './../../../../../../Modules/userDetails';
import { AuthService } from './../../../../authentication/Auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-Rate',
  templateUrl: './Rate.component.html',
  styleUrls: ['./Rate.component.scss'],

})
export class RateComponent implements OnInit {
  userDetails:userDetails;
  FullName:string;
  acepterId:number;
  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  constructor(@Inject(MAT_DIALOG_DATA)data:any,
              private http:HttpClient,
              private AuthService:AuthService
              ) 
   {
       this.acepterId=data['acepterId'];
      this.getName(''+data['acepterId']);
   }
   async getName(data){
       var options= {
        'headers': 
        {   'id': data,
            'Authorization': 'Bearer '+sessionStorage.getItem('key'),
            'Content-Type': 'application/json'
          }
        }
       await this.http.get(GetFullNmae,options).subscribe(response => {
           this.FullName=response['fullname'];
       })
   }
  ngOnInit() {
    this.userDetails=this.AuthService.userDetails();
  }
  onRatingChanged(rating){
    this.rating = rating;
}
async submitRate(){
    var options= {
        'headers': 
        {  
            'Authorization': 'Bearer '+sessionStorage.getItem('key'),
            'Content-Type': 'application/json'
        }
        }
await this.http.post(postRates,JSON.stringify({"userId": this.userDetails.id,"ratedAccount": this.acepterId,"rate": this.rating}),options).subscribe(r => {
});
}
  clicked(){
    this.submitRate();
  }
  
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}


