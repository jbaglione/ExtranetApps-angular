import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import {HallazgosService, PeriodicElement} from '../../../services/hallazgos/hallazgos.service';
import { Router } from '@angular/router';
import { Hallazgo } from 'src/app/models/hallazgo.model';


@Component({
  selector: 'app-hallazgos-list',
  templateUrl: './hallazgos-list.component.html',
  styleUrls: ['./hallazgos-list.component.css']
})
export class ListHallazgosComponent implements OnInit {

  dcHallazgos: string[] = ['nro','fecha','hora','titulo','motivo','administrador','estado','ultFecha','diasRta','duracion'];
  mtHallazgos = new MatTableDataSource();
  userToken:string;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor( private _hallazgosService:HallazgosService,
              private _router:Router) {
                  this._hallazgosService.GetHallazgos().subscribe(data=>{this.mtHallazgos.data = data});
                  console.log(this.mtHallazgos.data);
              
                  _hallazgosService.setTitulo("Lista de Hallazgos")
    }
  ngOnInit() {
    this.mtHallazgos.sort = this.sort;
  }

  verHallazgo(id:any)
  {
    console.log(this.mtHallazgos.data);
    this._router.navigate(['hallazgos/detail', id]);
  }
}