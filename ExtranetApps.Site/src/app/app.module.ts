import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
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
// import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
// import {} from '@angular/material/sidenav';
// export class PizzaPartyAppModule { }
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ListHallazgosComponent,
    HallazgoDetailComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,//Modo dos
    // FeatureRoutingModule,
    APP_ROUTING,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatSidenavModule,
    // MatToolbarModule
    SharedModule
  ],
  providers: [
    HallazgosListService
  ],
  bootstrap: [
    AppComponent],
  
})
export class AppModule { }
