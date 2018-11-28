import {  NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './modules/shared/not-found/not-found.component';

const routes:  Routes = [
    {path: '', loadChildren: './modules/home/home.module#HomeModule'},
    //traerme todas las rutas que tenga home.module (archivo) #clase
    {path: 'home', loadChildren: './modules/home/home.module#HomeModule'},
    {path: 'hallazgos', loadChildren: './modules/hallazgos/hallazgo.module#HallazgoModule'},
    //Siempre debe estar al final.
    { path: '**',  component: NotFoundComponent }
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