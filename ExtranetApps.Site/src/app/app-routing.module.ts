import {  NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const routes:  Routes = [
    {path: '', loadChildren: './modules/home/home.module#HomeModule'},

    //traerme todas las rutas que tenga home.module (archivo) #clase
    {path: 'home', loadChildren: './modules/home/home.module#HomeModule'},
    {path: 'hallazgo', loadChildren: './modules/hallazgos/hallazgo.module#HallazgoModule'}
]

@NgModule({

    imports: [
        //Averiguar
        RouterModule.forRoot(routes, {
          scrollPositionRestoration: 'enabled',
          anchorScrolling: 'enabled'
        })
      ],
      exports: [
        RouterModule
      ]
})

export class AppRoutingModule {
}