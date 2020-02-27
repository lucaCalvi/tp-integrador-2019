import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if(this.authService.isLogged()) {
      //login true
      return true;
    }
    else {
      this.router.navigateByUrl('/api/login');
      return false;
    }
  }
  
}
