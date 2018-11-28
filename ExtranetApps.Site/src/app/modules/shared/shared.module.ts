import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DialogComponent } from "./dialog/dialog.component";

@NgModule({
  imports: [
    CdkTableModule,
    MaterialModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  exports: [
    // CommonModule,
    // FlexLayoutModule,
    // TranslateModule,
    // NgxExampleLibraryModule,
    // WebStorageModule,
    // HeaderComponent,
    // SearchBarComponent,
    // FooterComponent,
    // SpinnerComponent,
    // HeroCardComponent,
    // HeroLoadingComponent,
    // ScrollToFirstInvalidDirective,
    // BrowserModule,
    // BrowserAnimationsModule,
    HeaderComponent,
    CdkTableModule,
    FooterComponent,
    NotFoundComponent
  ]
})

export class SharedModule {

}
