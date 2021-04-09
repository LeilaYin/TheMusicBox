import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurePagesService implements CanActivate {
  
  constructor(public token: TokenStorageService, public router: Router) { }
  
  isLoggedIn = !!this.token.getToken();

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.isLoggedIn) {
       window.alert("You are already signed in, access denied!");
       this.router.navigate(['profile'])
    }
    return true;
  }

}
