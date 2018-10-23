import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallazgosListService, PeriodicElement } from '../../../services/hallazgos/hallazgos.service';
import { listable } from '../../../models/listable.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Hallazgo } from 'src/app/models/hallazgo.model';
import {FormControl} from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-hallazgo-detail',
  templateUrl: './hallazgo-detail.component.html',
  styleUrls: ['./hallazgo-detail.component.css']
})
export class HallazgoDetailComponent implements OnInit {

  dataL:any;
  hallazgo:Hallazgo = new Hallazgo();
  gradoComplejidad:listable;
  date = new FormControl(new Date("2018-07-23T10:46:51.3278575-03:00"));
  usuario = new Usuario();
  id:string;
  test:listable;
  hallazgoS1:string;
  hallazgoS2:string;
  hallazgoS3:string;

  constructor(private _activatedRoute:ActivatedRoute, private _hallazgosListService:HallazgosListService) {
    
    _activatedRoute.params.subscribe(params => {
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

      this.id = params['id'];
      if(this.id !== 'nuevo')
      {
        this._hallazgosListService.GetHallazgo(this.id).subscribe(data => this.hallazgo = data);
        this._hallazgosListService.GetHallazgo(this.id).subscribe(data => this.hallazgoS1 = JSON.stringify(data));
      }


    });
  }

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['usuario', 'fecha', 'hora', 'clasificacion', 'descripcion', 'adjunto'];
  dataSource = new MatTableDataSource();
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.hallazgo.registraciones);
    this.dataSource.sort = this.sort;
  }
}