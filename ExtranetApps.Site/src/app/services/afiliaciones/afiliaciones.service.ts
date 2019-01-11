
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../../configs/app.config';

import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs';
import { LoggerService } from '../logger.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Afiliacion } from 'src/app/models/afiliacion.model';
import { listable } from 'src/app/models/listable.model';
import { ClientePotencial } from 'src/app/models/cliente-potencial.model';

@Injectable()
export class AfiliacionesService {
    pamiUrl: string;
    afiliacionesApiUrl: string;

    public tituloAfiliacion: Observable<string>;
    private tituloAfiliacionSubject: BehaviorSubject<string>;

    constructor(private http: Http, private httpClient: HttpClient, public snackBar: MatSnackBar) {
        this.afiliacionesApiUrl = AppConfig.endpoints.extranet + 'Afiliaciones';
        this.pamiUrl = AppConfig.endpoints.pami;
        this.tituloAfiliacionSubject = new BehaviorSubject<string>("Afiliaciones");
        this.tituloAfiliacion = this.tituloAfiliacionSubject.asObservable();
    }

    public setTitulo(newTitle) {
        this.tituloAfiliacionSubject.next(newTitle);
    }

    // afiliaciones: Afiliacion[];
    // public getAfiliaciones() {
    //     // this.afiliaciones = [{ id: 1, nro: 1, fecha: "2018-10-20T00:00:00", hora: "17:33", titulo: "Primer afiliacion prueba", motivo: new listable("1", "Mock motivo"), administrador: "Deberia ser un Id Administrador", estado: new listable("1", "Mock estado"), ultFecha: "2018-11-01T17:33:26.3742517-03:00", diasRta: 1, duracion: 1, registraciones: null }];// , destinos: null
    //     return this.afiliaciones;
    // }
    // clientePotencial: ClientePotencial[] 
    // public getClientePotencial() {
    //     this.clientePotencial[0] = new ClientePotencial();
    //     return this.clientePotencial;
    // }
    private static handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            LoggerService.log(`${operation} failed: ${error.message}`);
            if (error.status >= 500) {
                throw error;
            }
            return of(result as T);
        };
    }
    public getClientePotencial(tipoCliente:string, vendedor:string): Observable<ClientePotencial[]> {
        const url = `${this.afiliacionesApiUrl}`;
        const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json', 'TipoCliente': `${tipoCliente}`, 'Vendedor': `${vendedor}` });
        return this.httpClient.get<ClientePotencial[]>(url, { headers: headerOptions }).pipe(
            tap(() => LoggerService.log("fetched GetClientePotencial")),
            catchError(AfiliacionesService.handleError<ClientePotencial[]>("GetClientePotencial"))
        );
    }

    public getVendedores() {
        const url = `${this.afiliacionesApiUrl}/GetVendedores`;
        return this.httpClient.get<listable[]>(url).pipe(
            tap(() => LoggerService.log("fetched GetVendedores")),
            catchError(AfiliacionesService.handleError<listable[]>("GetVendedores"))
        );
    }

//     public GetAfiliacionesToken(token: string): Observable<any> {
//         const url = `${this.extranetUrl}`;
//         const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${token}` });
//         return this.httpClient.get<Afiliacion[]>(url, { headers: headerOptions }).pipe(
//             tap(() => LoggerService.log("fetched GetAfiliacionesToken")),
//             catchError(AfiliacionesService.handleError<Afiliacion[]>("GetAfiliacionesToken"))
//         );
//     }

//     public GetAfiliacion(id: number): Observable<Afiliacion> {
//         const url = `${this.extranetUrl}/${id}`;
//         return this.httpClient.get<Afiliacion>(url).pipe(
//             tap(() => LoggerService.log(`fetched Afiliacion id=${id}`)),
//             catchError(AfiliacionesService.handleError<Afiliacion>(`GetAfiliacion id =${id}`))
//         );
//     }

//     public GetMotivos(): Observable<listable> {
//         const url = `${this.extranetUrl}
// Listables/GetMotivos`;
//         return this.httpClient.get<listable>(url).pipe(
//             tap(() => LoggerService.log("fetched GetMotivos")),
//             catchError(AfiliacionesService.handleError<listable>("GetMotivos"))
//         );
//     }

//     public GetEstados(): Observable<listable> {
//         const url = `${this.extranetUrl}
// Listables/GetEstados`;
//         return this.httpClient.get<listable>(url).pipe(
//             tap(() => LoggerService.log("fetched GetEstados")),
//             catchError(AfiliacionesService.handleError<listable>("GetEstados"))
//         );
//     }

//     public GetNewAfiliacionNro(): Observable<number> {
//         const url = `${this.extranetUrl}
// GetNewAfiliacionNro`;
//         return this.httpClient.get<number>(url).pipe(
//             tap(() => LoggerService.log("fetched GetNewAfiliacionNro")),
//             catchError(AfiliacionesService.handleError<number>("GetNewAfiliacionNro"))
//         );
//     }
    // public CreateAfiliacionFake(): Observable<any> {
    //   let token:string = "";
    //   const url = `https://localhost:5001/security/Users`;
    //   const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });
    //   return this.httpClient.get<any>(url, { headers: headerOptions }).pipe(
    //     tap(() => LoggerService.log("fetched CreateAfiliacionFake")),
    //     catchError(AfiliacionesService.handleError<any>("CreateAfiliacionFake"))
    //   );
    // }


    // public CreateAfiliacion(afiliacion: Afiliacion) {
    //     const url = `${this.extranetUrl}`;
    //     const body = JSON.stringify(afiliacion);
    //     const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     return this.httpClient.post(url, body, { headers: headerOptions }).pipe(
    //         tap(() => {
    //             LoggerService.log("fetched CreateAfiliacion");
    //             this.showSnackBar("Afiliacion craedo");
    //         }),
    //         catchError(AfiliacionesService.handleError<Afiliacion>("CreateAfiliacion"))
    //     );
    // }


    // public showSnackBar(name): void {
    //     const config: any = new MatSnackBarConfig();
    //     config.duration = AppConfig.snackBarDuration;
    //     this.snackBar.open(name, 'OK', config);
    // }
}