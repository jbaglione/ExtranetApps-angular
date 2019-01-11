import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AfiliacionesListComponent } from "./afiliaciones-list/afiliaciones-list.component";
import { AfiliacionesDetailComponent } from "./afiliaciones-detail/afiliaciones-detail.component";

const AfiliacionesRoutes: Routes = [
  {path: '', component: AfiliacionesListComponent},
  {path: 'detail/:id', component: AfiliacionesDetailComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(AfiliacionesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AfiliacionesRoutingModule {
}