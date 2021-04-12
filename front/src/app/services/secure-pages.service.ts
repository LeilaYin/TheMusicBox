import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurePagesService implements CanActivate {
  isLoggedIn = false;

  constructor(public token: TokenStorageService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.isLoggedIn = !!this.token.getToken();
    if(this.isLoggedIn) {
       window.alert("You are already signed in, access denied!");
       this.router.navigate(['profile'])
    }
    return true;
  }
}
