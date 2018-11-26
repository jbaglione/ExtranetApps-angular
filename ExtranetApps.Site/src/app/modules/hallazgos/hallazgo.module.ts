import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HallazgoDetailComponent } from "./hallazgo-detail/hallazgo-detail.component";
import { ListHallazgosComponent } from "./hallazgos-list/hallazgos-list.component";
import { MaterialModule } from '../../modules/material/material.module'
import { UploadModule } from '../../modules/upload/upload.module'
import { HallazgoRoutingModule } from "./hallazgo-routing.module";

@NgModule({
    declarations: [
        HallazgoDetailComponent,
        ListHallazgosComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UploadModule,
        HallazgoRoutingModule
    ],
    exports: [
        HallazgoDetailComponent,
        ListHallazgosComponent
    ]
})
export class HallazgoModule { }