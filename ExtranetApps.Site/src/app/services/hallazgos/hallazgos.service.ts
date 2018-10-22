import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { throwError } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { map } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import {AppConfig} from '../../configs/app.config';

import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LoggerService} from '../logger.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../../models/usuario.model';

@Injectable()
export class HallazgosListService {

  // private accessPointUrl: string = 'http://localhost:64997/'; //(PamiApi)
  pamiUrl: string;
  constructor(private http: Http, private httpClient:HttpClient) {
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
    debugger;
    return this.http.get(this.pamiUrl + "GetGradosComplejidad").pipe(map(res=>res.json()));
  }

  // public GetGradosComplejidad(){
  //   debugger;
  //   return this.http.get(this.pamiUrl + "GetGradosComplejidad").pipe(map(res=>res.json()));
  // }

  //GetUsuarioValidacion(int id)
  public GetUsuarioValidacion(id: string): Observable<Usuario> {
    const url = `${this.pamiUrl + 'GetUsuarioValidacion'}/${id}`;
    return this.httpClient.get<Usuario>(url).pipe(
      tap(() => LoggerService.log(`fetched hero id=${id}`)),
      catchError(HallazgosListService.handleError<Usuario>(`getHero id=${id}`))
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

  

  public getHallazgo(id:string){
    this.getHallazgos();
    return this.hallazgos[id];
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