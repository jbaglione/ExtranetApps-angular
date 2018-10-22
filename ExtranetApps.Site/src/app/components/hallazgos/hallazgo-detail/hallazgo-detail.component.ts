import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallazgosListService, PeriodicElement } from '../../../services/hallazgos/hallazgos.service';
import { listable } from '../../../models/listable.model';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-hallazgo-detail',
  templateUrl: './hallazgo-detail.component.html',
  styleUrls: ['./hallazgo-detail.component.css']
})
export class HallazgoDetailComponent implements OnInit {

  dataL:any;
  hallazgo:PeriodicElement;
  gradoComplejidad:listable;
  // ID: number,
  //       NombreUsuario: string,
  //       FecHasta: string,
  //       btnAgregar: string,
  //       btnAutorizar: string,
  //       headerStyle: string
  usuario = new Usuario();
  id:string;

  constructor(private _activatedRoute:ActivatedRoute, private _hallazgosListService:HallazgosListService) {
    
    _activatedRoute.params.subscribe(params => {
      debugger;
      // console.log(params);
      // this._hallazgosListService.getHallazgosV2().subscribe(res=>this.dataL = res);
      // console.log(this.dataL);
      // this.hallazgo = this._hallazgosListService.getHallazgo(params['id']);
      this._hallazgosListService.GetGradosComplejidad().subscribe(data=>this.gradoComplejidad = data);

      this.id = params['id'];
      if(this.id !== 'nuevo')
      {
        this._hallazgosListService.GetUsuarioValidacion(this.id).subscribe(data=>this.usuario = data);
      }


    });
  }

  ngOnInit() {
  }

}