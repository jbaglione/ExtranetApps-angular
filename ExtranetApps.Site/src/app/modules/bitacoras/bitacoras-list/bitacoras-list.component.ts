import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { BitacorasService} from '../../../services/bitacoras/bitacoras.service';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { Bitacora } from 'src/app/models/bitacora.model';


@Component({
  selector: 'app-bitacoras-list',
  templateUrl: './bitacoras-list.component.html',
  styleUrls: ['./bitacoras-list.component.css']
})
export class ListBitacorasComponent implements OnInit {

  dcBitacoras: string[] = ['nro', 'fecha', 'hora', 'titulo', 'motivo', 'administrador', 'estado', 'ultFecha', 'diasRta', 'duracion'];
  mtBitacoras: MatTableDataSource<Bitacora>;
  userToken: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bitacorasService: BitacorasService,
    private commonService: CommonService,
    private router: Router) {
      commonService.setTitulo("Lista de Bitacoras");
  }
  // ngOnInit() {
  //   this.mtBitacoras.sort = this.sort;
  // }

  ngOnInit() {
    this.bitacorasService.GetBitacoras().subscribe(data => {
      this.mtBitacoras = new MatTableDataSource(data)
      this.mtBitacoras.paginator = this.paginator;
      this.mtBitacoras.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.mtBitacoras.filter = filterValue;
  }

  verBitacora(id: any) {
    // console.log(this.mtBitacoras.data);
    this.router.navigate(['bitacoras/detail', id]);
  }
}