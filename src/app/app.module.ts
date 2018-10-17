import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import {SharedModule} from './shared/shared.module';
import { ListHallazgosComponent } from './components/list-hallazgos/list-hallazgos.component';
// import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
// import {} from '@angular/material/sidenav';
// export class PizzaPartyAppModule { }
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListHallazgosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatSidenavModule,
    // MatToolbarModule
    SharedModule
  ],
  providers: [],
  bootstrap: [
    AppComponent],
  
})
export class AppModule { }
