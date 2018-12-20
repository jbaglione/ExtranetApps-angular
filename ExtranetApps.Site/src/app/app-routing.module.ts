import {  NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './modules/shared/not-found/not-found.component';
import { AuthGuard } from './_guards';

const routes:  Routes = [
    //{path: '', loadChildren: './modules/home/home.module#HomeModule'},//canActivate: [AuthGuard]
    //traerme todas las rutas que tenga home.module (archivo) #clase
    {path: 'autologin', loadChildren: './modules/home/home.module#HomeModule'},//, canActivate: [AuthGuard]
    {path: 'hallazgos', loadChildren: './modules/hallazgos/hallazgo.module#HallazgoModule',canActivate: [AuthGuard]},
    // {path: 'login', loadChildren: './login/login/'},
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