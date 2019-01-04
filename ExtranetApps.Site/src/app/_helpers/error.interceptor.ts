import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { AppConfig } from '../configs/app.config';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     debugger;
    //     return next.handle(request).pipe(catchError(err => {
    //         if (err.status === 401) {
    //             // auto logout if 401 response returned from api
    //             this.authenticationService.logout();
    //             location.reload(true);
    //         }

    //         const error = err.error.message || err.statusText;
    //         return throwError(error);
    //     }))
        
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	             
	            console.log(" all looks good");
	            // http response status code
                console.log(event.status);

                if(request.url.indexOf(AppConfig.endpoints.security) == -1) {
                    this.authenticationService.RefreshToken().subscribe();
                 }
	          }
	        }, error => {
	   			// http response status code
                  console.log("----response----");
                  console.log(request.url);
	          	console.error("status code:");
	          	console.error(error.status);
	          	console.error(error.message);
                console.log("--- end of response---");

                if(request.url.indexOf("refreshToken") > -1) {
                    if (error.status === 401) {
                        // auto logout if 401 response returned from api
                        this.authenticationService.logout();
                        location.reload(true);
                    }
                }
                const errorC = error.message || error.statusText;
                return throwError(errorC);

	        })
	      )
    }
    
}