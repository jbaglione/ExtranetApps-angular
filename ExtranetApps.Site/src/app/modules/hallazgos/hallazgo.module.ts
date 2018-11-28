import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HallazgoDetailComponent } from "./hallazgo-detail/hallazgo-detail.component";
import { ListHallazgosComponent } from "./hallazgos-list/hallazgos-list.component";
import { MaterialModule } from '../../modules/material/material.module'
import { UploadModule } from '../../modules/upload/upload.module'
import { HallazgoRoutingModule } from "./hallazgo-routing.module";
import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations: [
        HallazgoDetailComponent,
        ListHallazgosComponent
        // HallazgoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UploadModule,
        HallazgoRoutingModule,
        SharedModule
    ],
    exports: [
        HallazgoDetailComponent,
        ListHallazgosComponent
    ]
})
export class HallazgoModule { }