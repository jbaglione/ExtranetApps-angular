import { AfiliacionesDetailComponent } from '../afiliaciones-detail/afiliaciones-detail.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { AfiliacionesService } from '../../../services/afiliaciones/afiliaciones.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonService } from '../../../services/common.service';
// import { Router } from '@angular/router';
// import { Hallazgo } from 'src/app/models/hallazgo.model';
import { listable } from 'src/app/models/listable.model';
import { FormControl, Validators } from '@angular/forms';
import { ClientePotencial } from 'src/app/models/cliente-potencial.model';

@Component({
  selector: 'app-afiliaciones-list',
  templateUrl: './afiliaciones-list.component.html',
  styleUrls: ['./afiliaciones-list.component.css']
})

export class AfiliacionesListComponent implements OnInit {

  dcClientesPotenciales: string[] = ['nombreComercial', 'rubro', 'razonSocial', 'cuit', 'domicilio', 'localidad', 'credencialID'];
  mtClientesPotenciales: MatTableDataSource<ClientePotencial>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  userToken: string;
  userAcceso: string;

  tiposClientes: listable[] = [
    { descripcion: 'Todos', id: '0' },
    { descripcion: 'Potenciales', id: '1' },
    { descripcion: 'Preparados', id: '2' },
    { descripcion: 'Activos', id: '3' },
    { descripcion: 'Inactivos', id: '4' }
  ];
  vendedores: listable[] = [{ descripcion: 'Todos', id: '' }];//For fix error load.
  tiposClientesSelect: FormControl;
  vendedoresSelect: FormControl;
  descripcionInput: FormControl;

  constructor(
    private afiliacionesService: AfiliacionesService,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    public dialog: MatDialog) {

    commonService.setTitulo("Lista de Clientes Potenciales");

    this.descripcionInput = new FormControl();
    this.tiposClientesSelect = new FormControl(this.tiposClientes[0].id);
    this.vendedoresSelect = new FormControl(this.vendedores[0].id);

    this.afiliacionesService.getVendedores().subscribe(data => {
      debugger;
      this.vendedores = data;
      // this.vendedoresSelect = new FormControl("");
    });
    debugger;
    this.userAcceso = this.authenticationService.currentUserValue.acceso;
    if (this.userAcceso == '1')
      this.dcClientesPotenciales.push('estado', 'contrato');
  }

  ngOnInit() {
    this.afiliacionesService.getClientePotencial(this.tiposClientes[0].id, "").subscribe(data => {
      this.mtClientesPotenciales = new MatTableDataSource(data)
      this.mtClientesPotenciales.paginator = this.paginator;
      this.mtClientesPotenciales.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.mtClientesPotenciales.filter = filterValue;
  }

  GetClientesFiltrados() {
    this.afiliacionesService.getClientePotencial(this.tiposClientesSelect.value, this.vendedoresSelect.value).subscribe(
      data => {
        this.mtClientesPotenciales.data = data;
        this.applyFilter(this.descripcionInput.value);
      });
  }

  openDialogCliente(paramClienteId: number = 0): void {
    debugger;
    const dialogRef = this.dialog.open(AfiliacionesDetailComponent, {
      width: '95%',
      height: '95%',
      data: { clienteId: paramClienteId }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}