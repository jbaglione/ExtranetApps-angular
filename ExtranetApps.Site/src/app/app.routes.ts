import { Routes, RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';

import { HomeComponent } from './modules/home/home/home.component';
import { ListHallazgosComponent } from './modules/hallazgos/hallazgos-list/hallazgos-list.component';
import { HallazgoDetailComponent } from './modules/hallazgos/hallazgo-detail/hallazgo-detail.component';
// import { Name4Component } from './';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'hallazgos', component: ListHallazgosComponent },
    { path: 'hallazgos/detail/:id', component: HallazgoDetailComponent },
    // { path: 'path4', component: Name4Component },
    { path: '**', component: NotFoundComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);//, {useHash: true});
// @NgModule({
//     imports: [RouterModule.forChild(APP_ROUTES)],
//     exports: [RouterModule]
// })
// export class FeatureRoutingModule {}

