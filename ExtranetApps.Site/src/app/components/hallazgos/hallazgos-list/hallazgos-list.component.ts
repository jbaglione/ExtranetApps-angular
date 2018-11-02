import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import {HallazgosListService, PeriodicElement} from '../../../services/hallazgos/hallazgos.service';
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


  @ViewChild(MatSort) sort: MatSort;
  
  constructor( private _hallazgosListService:HallazgosListService, private _router:Router) {
    this._hallazgosListService.GetHallazgos().subscribe(data=>{this.mtHallazgos.data = data});
  }

  ngOnInit() {
    this.mtHallazgos.sort = this.sort;
  }

  verHallazgo(id:number)
  {
    this._router.navigate(['hallazgos/detail', id]);
  }

}


        


