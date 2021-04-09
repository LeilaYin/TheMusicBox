import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    isLoggedIn = false;
    constructor(private token: TokenStorageService, private router: Router) { }
  
    ngOnInit(): void {
      this.isLoggedIn = !!this.token.getToken();
    }

    canActivate(): boolean {
        if (!this.isLoggedIn) {
            window.alert('Access Denied, Login is Required to Access This Page!');
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}