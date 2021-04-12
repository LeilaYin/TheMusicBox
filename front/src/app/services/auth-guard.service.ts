import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthGuardService implements CanActivate {

    isLoggedIn = false;

    constructor(private token: TokenStorageService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.isLoggedIn = !!this.token.getToken();
        if (this.isLoggedIn !== true) {
            window.alert('Access Denied, Login is Required to Access This Page!')
            this.router.navigate(['login'])
        }
        return true;
    }
}