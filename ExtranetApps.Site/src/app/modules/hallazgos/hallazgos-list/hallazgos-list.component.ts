import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { HallazgosService} from '../../../services/hallazgos/hallazgos.service';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { Hallazgo } from 'src/app/models/hallazgo.model';


@Component({
  selector: 'app-hallazgos-list',
  templateUrl: './hallazgos-list.component.html',
  styleUrls: ['./hallazgos-list.component.css']
})
export class ListHallazgosComponent implements OnInit {

  dcHallazgos: string[] = ['nro', 'fecha', 'hora', 'titulo', 'motivo', 'administrador', 'estado', 'ultFecha', 'diasRta', 'duracion'];
  mtHallazgos: MatTableDataSource<Hallazgo>;
  userToken: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private hallazgosService: HallazgosService,
    private commonService: CommonService,
    private router: Router) {
      commonService.setTitulo("Lista de Hallazgos");
  }
  // ngOnInit() {
  //   this.mtHallazgos.sort = this.sort;
  // }

  ngOnInit() {
    this.hallazgosService.GetHallazgos().subscribe(data => {
      this.mtHallazgos = new MatTableDataSource(data)
      this.mtHallazgos.paginator = this.paginator;
      this.mtHallazgos.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.mtHallazgos.filter = filterValue;
  }

  verHallazgo(id: any) {
    console.log(this.mtHallazgos.data);
    this.router.navigate(['hallazgos/detail', id]);
  }
}