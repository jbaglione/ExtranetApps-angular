import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';

import { JwtInterceptor, ErrorInterceptor} from './_helpers';

//Servicios
import { BitacorasService } from './services/bitacoras/bitacoras.service';
import { AfiliacionesService } from './services/afiliaciones/afiliaciones.service';
import { GestionesService } from './services/actividades-clientes/gestiones.service';
// import { BitacoraModule } from './modules/bitacoras/bitacora.module';
import { AppRoutingModule } from "./app-routing.module";
import { CommonService } from './services/common.service';
import { MAT_DATE_LOCALE } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ],

  providers: [
    BitacorasService,
    AfiliacionesService,
    CommonService,
    GestionesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
  ],
  bootstrap: [
    AppComponent],

})
export class AppModule { }