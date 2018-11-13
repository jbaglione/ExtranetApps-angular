import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { AppConfig } from '../../configs/app.config';

import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { LoggerService } from '../logger.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Usuario} from '../../models/usuario.model';
import { Hallazgo } from 'src/app/models/hallazgo.model';
import { listable } from 'src/app/models/listable.model';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material';

@Injectable()
export class HallazgosListService {
  pamiUrl: string;
  extranetUrl: string;
  constructor(private http: Http, private httpClient: HttpClient, public snackBar: MatSnackBar) {
    this.extranetUrl = AppConfig.endpoints.extranet;
    this.pamiUrl = AppConfig.endpoints.pami;
  }


  hallazgos: Hallazgo[];
  public getHallazgos() {
    this.hallazgos = [{ id: 1, nro: 1, fecha: "2018-10-20T00:00:00", hora: "17:33", titulo: "Primer hallazgo prueba", motivo:new listable("1","Mock motivo"), administrador: "Deberia ser un Id Administrador", estado:new listable("1","Mock estado"), ultFecha: "2018-11-01T17:33:26.3742517-03:00", diasRta: 1, duracion: 1, registraciones: null }];// , destinos: null
    return this.hallazgos;
  }

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
  public GetHallazgos(): Observable<Hallazgo[]> {
    const url = `${this.extranetUrl}`;
    return this.httpClient.get<Hallazgo[]>(url).pipe(
      tap(() => LoggerService.log("fetched GetHallazgos")),
      catchError(HallazgosListService.handleError<Hallazgo[]>("GetHallazgos"))
    );
  }

  public GetHallazgo(id: number): Observable<Hallazgo> {
    const url = `${this.extranetUrl}/${id}`;
    return this.httpClient.get<Hallazgo>(url).pipe(
      tap(() => LoggerService.log(`fetched Hallazgo id=${id}`)),
      catchError(HallazgosListService.handleError<Hallazgo>(`GetHallazgo id=${id}`))
    );
  }

  public GetMotivos(): Observable<listable> {
    const url = `${this.extranetUrl}Listables/GetMotivos`;
    return this.httpClient.get<listable>(url).pipe(
      tap(() => LoggerService.log("fetched GetMotivos")),
      catchError(HallazgosListService.handleError<listable>("GetMotivos"))
    );
  }

  public GetEstados(): Observable<listable> {
    const url = `${this.extranetUrl}Listables/GetEstados`;
    return this.httpClient.get<listable>(url).pipe(
      tap(() => LoggerService.log("fetched GetEstados")),
      catchError(HallazgosListService.handleError<listable>("GetEstados"))
    );
  }

  public CreateHallazgo(hallazgo: Hallazgo) {
    const url = `${this.extranetUrl}`;
    const body = JSON.stringify(hallazgo);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(url, body, { headers: headerOptions }).pipe(
        tap(() => 
        {
          LoggerService.log("fetched CreateHallazgo");
          this.showSnackBar("Hallazgo craedo");
        }),
        catchError(HallazgosListService.handleError<Hallazgo>("CreateHallazgo"))
      );
  }


  public showSnackBar(name): void {
      const config: any = new MatSnackBarConfig();
      config.duration = AppConfig.snackBarDuration;
      this.snackBar.open(name, 'OK', config);
    }
}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}