import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { AppConfig } from '../configs/app.config';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;
    securityUrl: string;
    oldExranetUrl: string;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
        this.securityUrl = AppConfig.endpoints.security;
        this.oldExranetUrl = AppConfig.endpoints.oldExranet;
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.securityUrl}/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    // //TODO: borrar, es prueba
    // GetAll() {
    //     return this.http.get<any[]>(`${this.securityUrl}`);
    // }

    loginByToken(token: string) {
        return this.http.post<any>(`${this.securityUrl}authenticateByToken`, { token })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    RefreshToken() {
        const url = `${this.securityUrl}refreshToken`;
        const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${this.currentUserValue.token}`, 'Micrositio': `${this.currentUserValue.micrositio}` });
        return this.http.get<any>(url, { headers: headerOptions }).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                console.log("RefreshToken");
                console.log(user.token);
                console.log(this.currentUserValue.token);
            }

            return user;
        }));

        // return this.http.get<any>(`${this.securityUrl}refreshToken`)
        //     .pipe(map(user => {
        //         debugger;
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        //         }

        //         return user;
        //     }));
    }
    

    loginBase64(base64: string) {
        return this.http.post<any>(`${this.securityUrl}/authenticateBase64`, { base64 })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

        window.location.href = this.oldExranetUrl + 'Login?logout=true';
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
    
        if (decoded.exp === undefined) return null;
    
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
      }
    
      isTokenExpired(token?: string): boolean {
        if(!token)
            token = this.currentUserValue.token;
        if(!token)
            return true;
    
        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
      }
}