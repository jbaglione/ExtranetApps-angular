import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';


//Servicios
import { HallazgosListService } from './services/hallazgos/hallazgos.service';

// import { HallazgoModule } from './modules/hallazgos/hallazgo.module';
import { AppRoutingModule } from "./app-routing.module";


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
    HallazgosListService
  ],
  bootstrap: [
    AppComponent],

})
export class AppModule { }