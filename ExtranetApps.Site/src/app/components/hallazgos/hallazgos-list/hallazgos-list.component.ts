import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import {HallazgosListService, PeriodicElement} from '../../../services/hallazgos/hallazgos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hallazgos-list',
  templateUrl: './hallazgos-list.component.html',
  styleUrls: ['./hallazgos-list.component.css']
})
export class ListHallazgosComponent implements OnInit {

  constructor( private _hallazgosListService:HallazgosListService, private _router:Router) {

    
  }

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource();//ELEMENT_DATA);
  
  ngOnInit() {
    const ELEMENT_DATA: PeriodicElement[] = this._hallazgosListService.getHallazgos();

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
  }

  verHallazgo(id:number)
  {
    this._router.navigate(['hallazgos/detail', id]);
    // console.log(id);
  }

}


        


