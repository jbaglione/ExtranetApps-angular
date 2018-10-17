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
import {Component} from '@angular/core';

@Component({
selector: 'app-header',
templateUrl: './header.template.html'
})
export class HeaderComponent{
  
}