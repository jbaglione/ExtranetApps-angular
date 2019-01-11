import { Injectable } from '@angular/core';
import { AppConfig } from '../configs/app.config';

import {BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material';

@Injectable()
export class CommonService {
  public titulo:Observable<string>;
  private tituloSubject: BehaviorSubject<string>;
  
  constructor(public snackBar: MatSnackBar) {
    this.tituloSubject = new BehaviorSubject<string>("Extranet");
        this.titulo = this.tituloSubject.asObservable();
  }

  public setTitulo(newTitle) {
    this.tituloSubject.next(newTitle);
  }

  public showSnackBar(name): void {
      const config: any = new MatSnackBarConfig();
      config.duration = AppConfig.snackBarDuration;
      this.snackBar.open(name, 'OK', config);
    }
}