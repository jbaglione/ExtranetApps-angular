import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map , catchError, tap} from 'rxjs/operators';
import {AppConfig} from '../../configs/app.config';

import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {LoggerService} from '../logger.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../../models/usuario.model';
import { Hallazgo } from 'src/app/models/hallazgo.model';
import { listable } from 'src/app/models/listable.model';

@Injectable()
export class HallazgosListService {
  pamiUrl: string;
  extranetUrl: string;
  constructor(private http: Http, private httpClient:HttpClient) {
    this.extranetUrl = AppConfig.endpoints.extranet;
    this.pamiUrl = AppConfig.endpoints.pami;
  }

 
hallazgos:PeriodicElement[];
  public getHallazgos(){

    this.hallazgos = [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      ];
    return this.hallazgos;
  }

  public GetGradosComplejidad(){
    return this.http.get(this.pamiUrl + "GetGradosComplejidad").pipe(map(res=>res.json()));
  }

  // public GetGradosComplejidad(){
  //   return this.http.get(this.pamiUrl + "GetGradosComplejidad").pipe(map(res=>res.json()));
  // }

  //GetUsuarioValidacion(int id)
  public GetUsuarioValidacion(id: string): Observable<Usuario> {
    const url = `${this.pamiUrl + 'GetUsuarioValidacion'}/${id}`;
    return this.httpClient.get<Usuario>(url).pipe(
      tap(() => LoggerService.log(`fetched Usuario id=${id}`)),
      catchError(HallazgosListService.handleError<Usuario>(`getUsuario id=${id}`))
    );
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

  
  public GetHallazgo(id: string): Observable<Hallazgo> {
    const url = `${this.extranetUrl}/${id}`;
    return this.httpClient.get<Hallazgo>(url).pipe(
      tap(() => LoggerService.log(`fetched Hallazgo id=${id}`)),
      catchError(HallazgosListService.handleError<Hallazgo>(`GetHallazgo id=${id}`))
    );
  }

  public getTest(id:string){
    const url = `${this.extranetUrl}/${id}`;
    return this.httpClient.get<listable>(url).pipe(
      tap(() => 
      {
        LoggerService.log(`fetched test id=${id}`)
      }
      
      ),
      catchError(HallazgosListService.handleError<listable>(`getTest id=${id}`))
    );

  }

//   public get() {
//     // Get all jogging data
//     return this.http.get(this.accessPointUrl, {headers: this.headers});
//   }

//   public add(payload) {
//     return this.http.post(this.accessPointUrl, payload, {headers: this.headers});
//   }

//   public remove(payload) {
//     return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: this.headers});
//   }

//   public update(payload) {
//     return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
//   }

}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }