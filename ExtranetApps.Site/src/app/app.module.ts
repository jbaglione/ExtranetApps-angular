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
import { HallazgosService } from './services/hallazgos/hallazgos.service';
import { AfiliacionesService } from './services/afiliaciones/afiliaciones.service';
// import { HallazgoModule } from './modules/hallazgos/hallazgo.module';
import { AppRoutingModule } from "./app-routing.module";
import { CommonService } from './services/common.service';



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
    HallazgosService,
    AfiliacionesService,
    CommonService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent],

})
export class AppModule { }