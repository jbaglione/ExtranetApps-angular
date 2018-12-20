import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && !this.authenticationService.isTokenExpired(currentUser.token)) {
            // logged in so return true
            return true;
        }
        
        //TODO: navegar a error.
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/loginBase64'], { queryParams: { returnUrl: state.url } });
        // this.router.navigate(['/hallazgos']);
        window.location.href = 'http://localhost:2128/Login?logout=true';
        return false;
    }
}