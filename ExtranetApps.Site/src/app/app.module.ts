import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { moduleOrComponent } from 'path';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { HomeModule } from './modules/home/home.module';

//Rutas
// import { FeatureRoutingModule} from './app.routes'
// import { APP_ROUTING } from './app.routes'


//Servicios
import { HallazgosListService } from './services/hallazgos/hallazgos.service';

//Modulos
import { UploadModule } from './modules/upload/upload.module';
import { HallazgoModule } from './modules/hallazgos/hallazgo.module';
import { AppRoutingModule } from "./app-routing.module";

//Componentes
import { HeaderComponent } from './modules/shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    // APP_ROUTING,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UploadModule,
    HallazgoModule,
    HomeModule,
    SharedModule,
    AppRoutingModule
  ],
  // entryComponents: [],
  // exports: [SharedModule],
  providers: [
    HallazgosListService
  ],
  bootstrap: [
    AppComponent],

})
export class AppModule { }