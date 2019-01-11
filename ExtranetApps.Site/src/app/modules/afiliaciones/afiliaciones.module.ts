import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfiliacionesDetailComponent} from "./afiliaciones-detail/afiliaciones-detail.component";
import { AfiliacionesListComponent } from "./afiliaciones-list/afiliaciones-list.component";
import { MaterialModule } from '../../modules/material/material.module'
// import { UploadModule } from '../../modules/upload/upload.module'
import { AfiliacionesRoutingModule } from "./afiliaciones-routing.module";
import { SharedModule } from './../shared/shared.module';
import {  SafePipe } from "../../_helpers/safe.pipe";

@NgModule({
    declarations: [
        AfiliacionesDetailComponent,
        AfiliacionesListComponent,
        SafePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        // UploadModule,
        AfiliacionesRoutingModule,
        SharedModule
    ],
    exports: [
        AfiliacionesDetailComponent,
        AfiliacionesListComponent
    ]
})
export class AfiliacionesModule { }