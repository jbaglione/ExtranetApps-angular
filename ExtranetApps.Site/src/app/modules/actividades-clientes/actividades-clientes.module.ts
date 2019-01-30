import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConsumosComponent } from "./consumos/consumos-list/consumos.component";
import { CuentaCorrienteComponent } from "./cuenta.corriente/cuenta.corriente.component";
import { GestionDetailComponent } from "./gestiones/gestion-detail/gestion-detail.component";
import { GestionesComponent } from "./gestiones/gestiones-list/gestiones.component";
import { ReclamosComponent  } from "./reclamos/reclamos.component";

import { ActividadesClientesComponent  } from "./actividades-clientes.component";

import { MaterialModule } from '../../modules/material/material.module'
import { UploadModule } from '../../modules/upload/upload.module'
import { ActividadesClientesRoutingModule } from "./actividades-clientes-routing.module";
import { SharedModule } from './../shared/shared.module';
// import {  SafePipe } from "../../_helpers/safe.pipe";


@NgModule({
    declarations: [
        ConsumosComponent,
        CuentaCorrienteComponent,
        GestionesComponent,
        GestionDetailComponent,
        ReclamosComponent,
        ActividadesClientesComponent
        // SafePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UploadModule,
        ActividadesClientesRoutingModule,
        SharedModule
    ],
    exports: [
        ConsumosComponent,
        CuentaCorrienteComponent,
        GestionesComponent,
        GestionDetailComponent,
        ReclamosComponent,
        ActividadesClientesComponent
    ]
})
export class ActividadesClientesModule { }