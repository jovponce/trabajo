import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import {Route} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(
   private authService:AuthService,
   private router:Router
){}

  canActivate(): boolean{
    if (this.authService.loggedIn()){
      return true;
    }

    this.router.navigate(['/signin'])
    return false;
  }
    
  
}
