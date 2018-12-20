// 'use strict';

// angular.
//   module('pamiTrasladoApp').
//   component('appHeader', {
//     templateUrl: '/app-header/app-header.template.html',
//     bindings: {
//       usuario: '<'
//     },
//     controller: [
//       function AppHeaderController() {
//         var ctrl = this;
//       }
//     ]
//   });
import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { HallazgosService } from '../../../services/hallazgos/hallazgos.service';
import { Usuario } from 'src/app/models/usuario.model';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
selector: 'app-header',
templateUrl: './header.template.html'
})
export class HeaderComponent{
    user:Usuario;
    titulo:string;
    step = 1;

    setStep(index: number) {
      this.step = index;
    }
  
    nextStep() {
      this.step++;
    }
  
    prevStep() {
      this.step--;
    }
  
    constructor(
        private authenticationService: AuthenticationService,
        private hallazgosService:HallazgosService
    )
    {
     this.authenticationService.currentUser.subscribe(userLoged => { this.user = userLoged; });
     this.hallazgosService.tituloHallazgo.subscribe(currentTitulo => { this.titulo = currentTitulo; });
    // this.titulo = this.hallazgosService.tituloHallazgo;
    }

    // ngOnInit() {
    //     // this.loginForm = this.formBuilder.group({
    //     //     username: ['', Validators.required],
    //     //     password: ['', Validators.required]
    //     // });

    //     // reset login status
    //     this.authenticationService.logout();

    //     // get return url from route parameters or default to '/'
    //     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // }
    logout(){
        // debugger;
        // this.authenticationService.GetAll().subscribe();
        this.authenticationService.logout();
        
    }
}