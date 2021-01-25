import { SignalRService } from '@fuse/services/signal-r.service';
import { userDetails } from './../../../../Modules/userDetails';
import { LoginWithExternalProvider } from './../../../../Modules/LoginWithExternalProvider';
import { Router } from '@angular/router';
import { userforRestPassword } from './../../../../Modules/userforRestPassword';
import { userForgetPassword } from './../../../../Modules/userForgetPassword';
import { userResponse } from './../../../../Modules/userResponse';
import { userForLogin } from './../../../../Modules/userForLogin';
import { register, login, forgetPassword, restPassword, ExternalProvider } from './../../../../../URL_API';
import { userForRegister } from './../../../../Modules/userForRegister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
option = {headers : {'content-Type' : 'application/json'}};
constructor(private http:HttpClient,
            private router:Router,
             private authService: SocialAuthService
    ) { }

register(userForRegister:userForRegister){
return this.http.post<userForRegister>(register, userForRegister, this.option);
}
login(userForLogin:userForLogin){
return this.http.post<userResponse>(login,userForLogin,this.option);

}
forgetPassword(userForgetPassword: userForgetPassword){
return this.http.post(forgetPassword,userForgetPassword,this.option);
}
restPassword(userforRestPassword: userforRestPassword){
return this.http.post(restPassword,userforRestPassword,this.option);
}
isloggedIn(){
    try {
      if (sessionStorage.getItem('key')){
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(sessionStorage.getItem('key')?.toString());
        const isExpired = helper.isTokenExpired(sessionStorage.getItem('key')?.toString());  
        if (isExpired)
         {
          this.router.navigate(['/pages/auth/login-2']);
          return false;
        }
         else{
          return true;
        }
       }
      else{return false; }
     }
     catch (error) {
        this.router.navigate(['/pages/auth/login-2']);
        return false;
     }
   }
   isAdmin(){
    try {
      if (sessionStorage.getItem('key')){
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(sessionStorage.getItem('key')?.toString());
        const isExpired = helper.isTokenExpired(sessionStorage.getItem('key')?.toString());  
        if (isExpired)
         {
          this.router.navigate(['/pages/auth/login-2']);
          return false;
        }
         else{
             if(decodedToken.role == 'Admin')
             {
                return true;

             }
             else{
                 sessionStorage.removeItem('key');
                return false
                
             }
        }
       }
      else{return false; }
     }
     catch (error) {
        this.router.navigate(['/pages/auth/login-2']);
        return false;
     }
   }
   UserDetails:userDetails;
   userDetails(){
       if(sessionStorage.getItem('key')){
        const helper = new JwtHelperService();
        const decodedToken : any = helper.decodeToken(sessionStorage.getItem('key')?.toString());
        this.UserDetails = new userDetails(decodedToken.id,decodedToken.firstName,decodedToken.lastName
            ,decodedToken.fullName,decodedToken.email,decodedToken.role
            ,decodedToken.created,sessionStorage.getItem('avatar')?.toString(),
            decodedToken.isVerified ,decodedToken.PhoneNumber, decodedToken.Location)
        return this.UserDetails;
       }
       else{
           return 
       }
      
   }
async SinginWithGoogle(loginWithExternalProvider:LoginWithExternalProvider){
await this.http.post<userResponse>(ExternalProvider,loginWithExternalProvider,this.option).subscribe((userResponse:userResponse) => {
    sessionStorage.setItem('key',userResponse.jwtToken);
    this.router.navigate(['**']);
})
   }
async SinginWithFacebook(loginWithExternalProvider:LoginWithExternalProvider){
    await this.http.post<userResponse>(ExternalProvider,loginWithExternalProvider,this.option).subscribe((userResponse:userResponse) => {
        sessionStorage.setItem('key',userResponse.jwtToken);
        this.router.navigate(['**']);
    });
}
loginWithExternalProvider:LoginWithExternalProvider;
 async signInWithGoogle() {
     await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
     await this.authService.authState.subscribe((response : any) => {    
         this.loginWithExternalProvider = new LoginWithExternalProvider(response.firstName,response.lastName,
            response.idToken,response.email,response.provider,response.id)
         this.SinginWithGoogle( this.loginWithExternalProvider);
      });
     }
 async signInWithFB() {
        await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
         await this.authService.authState.subscribe((response : any) => {
            this.loginWithExternalProvider = new LoginWithExternalProvider(response.firstName,response.lastName,
                response.authToken,response.email,response.provider,response.id)
            this.SinginWithFacebook( this.loginWithExternalProvider);
       });
 }  
 logout(){
     sessionStorage.removeItem('key');
 }
}
