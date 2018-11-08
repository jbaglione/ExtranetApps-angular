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
import { getLocaleDateTimeFormat } from '@angular/common';

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
            // this.hallazgo.fecha = new Date('20/10/2018');
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
    this.reg_adjuntos = registracion.adjuntos;
    // console.log(JSON.stringify(registracion));
  }

  // guardarHallazgo(newHero: Hero) {
  //   if (this.newHeroForm.valid) {
  //     this.heroService.createHero(newHero).subscribe((newHeroWithId) => {
  //       this.heroes.push(newHeroWithId);
  //       this.myNgForm.resetForm();
  //     }, (response: Response) => {
  //       if (response.status === 500) {
  //         this.error = 'errorHasOcurred';
  //       }
  //     });
  //   }
  // }
nuevaRegistracion()
{
  this.hallazgo.registraciones.push(new Registracion);
  this.mtRegistraciones.data = this.hallazgo.registraciones;
  console.log(this.hallazgo);
}

  guardarHallazgo()
  {
    debugger;
      let indice:number = this.hallazgo.registraciones.length-1;
      this.hallazgo.registraciones[indice].descripcion = this.reg_descripcion;
      this.hallazgo.registraciones[indice].adjuntos = this.reg_adjuntos;
      this.hallazgo.registraciones[indice].hora = new Date().toTimeString().substring(0,5);
      this.hallazgo.registraciones[indice].usuario = 'jonathan.baglione';
      // this.hallazgo.registraciones = null;
    
      this._hallazgosListService.CreateHallazgo(this.hallazgo).subscribe(() => {
            // this.hallazgo.push(newHeroWithId);
            // this.myNgForm.resetForm();
          }, (response: Response) => {
            if (response.status === 500) {
              console.log('errorHasOcurred');
            }
          });
    // this.reg_descripcion = registracion.descripcion;
    // this.reg_clasificacion = registracion.clasificacion;
    // this.reg_adjuntos = registracion.adjuntos;
    // console.log(JSON.stringify(registracion));
  }
}