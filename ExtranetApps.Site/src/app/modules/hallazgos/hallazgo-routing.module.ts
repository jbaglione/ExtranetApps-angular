import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ListHallazgosComponent } from "./hallazgos-list/hallazgos-list.component";
import { HallazgoDetailComponent } from "./hallazgo-detail/hallazgo-detail.component";


const hallazgosRoutes: Routes = [
  {path: '', component: ListHallazgosComponent},
  {path: 'detail/:id', component: HallazgoDetailComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(hallazgosRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class HallazgoRoutingModule {
}