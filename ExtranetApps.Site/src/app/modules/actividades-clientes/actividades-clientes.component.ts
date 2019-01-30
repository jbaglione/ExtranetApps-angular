import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'actividades-clientes',
  templateUrl: './actividades-clientes.component.html',
  styleUrls: ['./actividades-clientes.component.css']
})
export class ActividadesClientesComponent {
  clienteId: number = 0;
  selectTab: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      
      this.clienteId = parseFloat(params['clienteId']);
    });
  }
}