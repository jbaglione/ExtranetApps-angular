import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { moduleOrComponent } from 'path';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';

//Rutas
// import { FeatureRoutingModule} from './app.routes'
import { APP_ROUTING } from './app.routes'

//Servicios
import{HallazgosListService} from './services/hallazgos/hallazgos.service';

//Componentes
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ListHallazgosComponent } from './components/hallazgos/hallazgos-list/hallazgos-list.component';
import { HallazgoDetailComponent } from './components/hallazgos/hallazgo-detail/hallazgo-detail.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { UploadModule } from './modules/upload/upload.module';
import { DialogComponent } from './components/shared/dialog/dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ListHallazgosComponent,
    HallazgoDetailComponent,
    NotFoundComponent,
    DialogComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UploadModule
  ],
  entryComponents: [DialogComponent],
  
  providers: [
    HallazgosListService
  ],
  bootstrap: [
    AppComponent],
  
})
export class AppModule { }
        // "rxjs": "^6.3.3",