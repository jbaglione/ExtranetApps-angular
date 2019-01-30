import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BitacoraDetailComponent } from "./bitacora-detail/bitacora-detail.component";
import { ListBitacorasComponent } from "./bitacoras-list/bitacoras-list.component";
import { MaterialModule } from '../../modules/material/material.module'
import { UploadModule } from '../../modules/upload/upload.module'
import { BitacoraRoutingModule } from "./bitacora-routing.module";
import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        BitacoraDetailComponent,
        ListBitacorasComponent
        // BitacoraComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UploadModule,
        BitacoraRoutingModule,
        SharedModule
    ],
    exports: [
        BitacoraDetailComponent,
        ListBitacorasComponent
    ]
})
export class BitacoraModule { }