import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
  //{path: '', loadChildren: './modules/home/home.module#HomeModule'},//canActivate: [AuthGuard]
  //traerme todas las rutas que tenga home.module (archivo) #clase
  { path: 'autologin', loadChildren: './modules/home/home.module#HomeModule' },//, canActivate: [AuthGuard]
  { path: 'bitacoras', loadChildren: './modules/bitacoras/bitacora.module#BitacoraModule', canActivate: [AuthGuard] },
  { path: 'afiliaciones', loadChildren: './modules/afiliaciones/afiliaciones.module#AfiliacionesModule', canActivate: [AuthGuard] },
  { path: 'actividadesclientes', loadChildren: './modules/actividades-clientes/actividades-clientes.module#ActividadesClientesModule', canActivate: [AuthGuard] },
  // {path: 'login', loadChildren: './login/login/'},
  //Siempre debe estar al final.
  { path: '**', component: NotFoundComponent }
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