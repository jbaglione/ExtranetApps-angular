import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallazgosListService, PeriodicElement } from '../../../services/hallazgos/hallazgos.service';
import { listable } from '../../../models/listable.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Hallazgo } from 'src/app/models/hallazgo.model';
import {FormControl} from '@angular/forms';
import { MatTableDataSource, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Destino } from 'src/app/models/destino.model';
import { Registracion } from 'src/app/models/registracion.model';

@Component({
  selector: 'app-hallazgo-detail',
  templateUrl: './hallazgo-detail.component.html',
  styleUrls: ['./hallazgo-detail.component.css']
})


export class HallazgoDetailComponent implements OnInit {
  id:string;

  hallazgo:Hallazgo = new Hallazgo();
  motivos:listable;
  estados:listable;
  clasificaciones:listable;

  //Panel Registraciones detalle:
  reg_descripcion:string;
  reg_clasificacion:string;
  reg_adjuntos: string[];

  @ViewChild(MatSort) sort: MatSort;
  dcRegistraciones: string[] = ['usuario', 'fecha', 'hora'];//', 'adjuntos''clasificacion', 'descripcion',
  // dcDestinos: string[] = ['usuario', 'finalizacionPermiso'];
  mtRegistraciones = new MatTableDataSource();
  // mtDestinos =  new MatTableDataSource();
  // usuario = new Usuario();
  // date = new FormControl(new Date("2018-07-23T10:46:51.3278575-03:00"));
  // test:listable;
  // hallazgoS1:string;
  // hallazgoS2:string;
  // hallazgoS3:string;
  // selection = new SelectionModel<Destino>(true, []);
  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.mtDestinos.data.length;
  //   return numSelected === numRows;
  // }
  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.selection.clear();
  //   // this.isAllSelected() ?
  //   //     this.selection.clear() :
  //   //     this.mtDestinos.data.forEach(row => this.selection.select(row));
  // }
  //constructor(..
  // console.log(params);
  // this._hallazgosListService.getHallazgosV2().subscribe(res=>this.dataL = res);
  // console.log(this.dataL);
  // this.hallazgo = this._hallazgosListService.getHallazgo(params['id']);
  //  this._hallazgosListService.GetClasificaciones().subscribe(data=>this.clasificaciones = data);
  // this.id = params['id'];
  // if(this.id !== 'nuevo')
  // {
  //   this._hallazgosListService.GetUsuarioValidacion(this.id).subscribe(data=>this.usuario = data);
  // }
// this._hallazgosListService.GetHallazgo(this.id).subscribe(data => this.hallazgoS1 = JSON.stringify(data));
  
  constructor(private _activatedRoute:ActivatedRoute, private _hallazgosListService:HallazgosListService) {
    
    _activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      this._hallazgosListService.GetMotivos().subscribe(data=>this.motivos = data);
      this._hallazgosListService.GetEstados().subscribe(data=>this.estados = data);
      this._hallazgosListService.GetClasificaciones().subscribe(data=>this.clasificaciones = data);

      if(this.id !== 'nuevo')
      {
        this._hallazgosListService.GetHallazgo(this.id).subscribe(data =>
          {
            this.hallazgo = data;
            this.mtRegistraciones.data = data.registraciones;
            // this.mtDestinos.data = data.destinos;
          });
      }
    });
  }


  ngOnInit() {
    this.mtRegistraciones.sort = this.sort;
    // this.mtDestinos.sort = this.sort;
  }

  verRegistracion(registracion: Registracion)
  {
    this.reg_descripcion = registracion.descripcion;
    this.reg_clasificacion = registracion.clasificacion;
    this.reg_adjuntos = registracion.adjuntos;
    // console.log(JSON.stringify(registracion));
  }

  guardarHallazgo()
  {
    debugger;
    this.hallazgo;
    console.log(JSON.stringify(this.hallazgo));
    
    // this.reg_descripcion = registracion.descripcion;
    // this.reg_clasificacion = registracion.clasificacion;
    // this.reg_adjuntos = registracion.adjuntos;
    // console.log(JSON.stringify(registracion));
  }
}