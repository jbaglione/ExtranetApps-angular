import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../../configs/app.config';

import {Observable, of, throwError as observableThrowError } from 'rxjs';
import { LoggerService } from '../logger.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Usuario} from '../../models/usuario.model';
import { ClientesGestion } from 'src/app/models/clientes-gestion';
import { listable } from 'src/app/models/listable.model';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material';

@Injectable()
export class GestionesService {
  pamiUrl: string;
  gestionApiUrl: string;

  constructor(private http: Http, private httpClient: HttpClient, public snackBar: MatSnackBar) {
    this.gestionApiUrl = AppConfig.endpoints.api + 'ClientesGestiones';
  }

  //gestiones: ClientesGestion[];
  // public getGestiones() {
  //   this.gestiones = [{ id: 1, nro: 1, fecha: "2018-10-20T00:00:00", hora: "17:33", titulo: "Primer gestion prueba", motivo:new listable("1","Mock motivo"), administrador: "Deberia ser un Id Administrador", estado:new listable("1","Mock estado"), ultFecha: "2018-11-01T17:33:26.3742517-03:00", diasRta: 1, duracion: 1, registraciones: null }];// , destinos: null
  //   return this.gestiones;
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

  public GetGestiones(clienteId: number): Observable<ClientesGestion[]> {
    const url = `${this.gestionApiUrl}/${clienteId}`;
    return this.httpClient.get<ClientesGestion[]>(url).pipe(
      tap(() => LoggerService.log("fetched GetGestiones")),
      catchError(GestionesService.handleError<ClientesGestion[]>("GetGestiones"))
    );
  }

  public GetGestion(id: number): Observable<ClientesGestion> {
    const url = `${this.gestionApiUrl}/GetById/${id}`;
    debugger;
    return this.httpClient.get<ClientesGestion>(url).pipe(
      tap(() => LoggerService.log(`fetched ClientesGestion id=${id}`)),
      catchError(GestionesService.handleError<ClientesGestion>(`GetClientesGestion id=${id}`))
    );
  }

  public GetTiposGestion(): Observable<listable> {
    const url = `${this.gestionApiUrl}/GetTiposGestion`;
    return this.httpClient.get<listable>(url).pipe(
      tap(() => LoggerService.log("fetched GetTiposGestion")),
      catchError(GestionesService.handleError<listable>("GetTiposGestion"))
    );
  }

  public GetNewClientesGestionNro(): Observable<number> {
    const url = `${this.gestionApiUrl}GetNewClientesGestionNro`;
    return this.httpClient.get<number>(url).pipe(
      tap(() => LoggerService.log("fetched GetNewClientesGestionNro")),
      catchError(GestionesService.handleError<number>("GetNewClientesGestionNro"))
    );
  }
  // public CreateClientesGestionFake(): Observable<any> {
  //   let token:string = "";
  //   const url = `https://localhost:5001/security/Users`;
  //   const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });
  //   return this.httpClient.get<any>(url, { headers: headerOptions }).pipe(
  //     tap(() => LoggerService.log("fetched CreateClientesGestionFake")),
  //     catchError(GestionesService.handleError<any>("CreateClientesGestionFake"))
  //   );
  // }
  

  public CreateClientesGestion(gestion: ClientesGestion) {
    const url = `${this.gestionApiUrl}`;
    const body = JSON.stringify(gestion);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(url, body, { headers: headerOptions }).pipe(
        tap(() => 
        {
          LoggerService.log("fetched CreateClientesGestion");
          this.showSnackBar("ClientesGestion creado");
        }),
        catchError(GestionesService.handleError<ClientesGestion>("CreateClientesGestion"))
      );
  }


  private showSnackBar(name): void {
      const config: any = new MatSnackBarConfig();
      config.duration = AppConfig.snackBarDuration;
      this.snackBar.open(name, 'OK', config);
    }
}