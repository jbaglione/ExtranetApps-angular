import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator, MatTab } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonService } from '../../../services/common.service';
import { listable } from 'src/app/models/listable.model';
import { FormControl, Validators } from '@angular/forms';

import { ClientePotencial } from 'src/app/models/cliente-potencial.model';
import { AfiliacionesService } from '../../../services/afiliaciones/afiliaciones.service';

@Component({
  selector: 'app-actividades-clientes-cuentacorriente',
  templateUrl: './cuenta.corriente.component.html',
  styleUrls: ['./cuenta.corriente.component.css']
})

export class CuentaCorrienteComponent implements OnInit {
  @Input() clienteId:number;
  dcClientesPotenciales: string[] = ['nombreComercial', 'rubro', 'razonSocial', 'cuit', 'domicilio', 'localidad', 'credencialID', 'estado', 'actividad'];
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
  estadosDesc: listable[] = [
    { descripcion: 'Sin estado', id: 'black' },
    { descripcion: 'Potencial', id: 'accent' },
    { descripcion: 'Preparado', id: 'primary' },
    { descripcion: 'Activo', id: 'black' },
    { descripcion: 'Inactivo', id: 'warn' }
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
      
      this.vendedores = data;
      // this.vendedoresSelect = new FormControl("");
    });
    
    this.userAcceso = this.authenticationService.currentUserValue.acceso;
    // if (this.userAcceso == '1')
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
}