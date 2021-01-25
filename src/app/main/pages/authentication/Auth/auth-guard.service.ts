import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

constructor(private LoginService: AuthService, private router: Router) { }
canActivate() {
  if (this.LoginService.isloggedIn())
  {
    return true;
  }
  this.router.navigate(['/pages/auth/login-2']);
  return false;
}
}
