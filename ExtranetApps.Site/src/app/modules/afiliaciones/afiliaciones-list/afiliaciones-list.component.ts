import { AfiliacionesDetailComponent } from '../afiliaciones-detail/afiliaciones-detail.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { AfiliacionesService } from '../../../services/afiliaciones/afiliaciones.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { CommonService } from '../../../services/common.service';
import { listable } from 'src/app/models/listable.model';
import { FormControl, Validators } from '@angular/forms';
import { ClientePotencial } from 'src/app/models/cliente-potencial.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-afiliaciones-list',
  templateUrl: './afiliaciones-list.component.html',
  styleUrls: ['./afiliaciones-list.component.css']
})

export class AfiliacionesListComponent implements OnInit {

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
    public dialog: MatDialog,
    private router: Router) {

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
    //   this.dcClientesPotenciales.push('estado', 'actividad');// , 'contrato'
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

  openDialogCliente(paramClienteId: number = 0, paramClienteEstado: number = 1,): void {
    //  this.downloadContrato(paramClienteId);
    
    const dialogRef = this.dialog.open(AfiliacionesDetailComponent, {
      width: '95vw',
      height: '95%',
      maxWidth: '95vw',
      panelClass: 'my-panel',
      data: { clienteId: paramClienteId, acceso:this.userAcceso, estado: paramClienteEstado}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }


  navigateToActividadCliente(paramClienteId: number = 0) {
    this.router.navigate(['actividadesclientes/', paramClienteId]);
  }


  // downloadContrato(paramClienteId: number = 0): void {
  //   
  // this.afiliacionesService.GetContrato(paramClienteId).subscribe(data => this.downloadFile(data)),//console.log(data),
  //                error => console.log('Error downloading the file.'),
  //                () => console.info('OK');
  // }
  // downloadFile(data: any) {
  //   const blob = new Blob([data], { type: 'text/csv' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }
  // getDescEstado(estado:number){
  //   this.tiposClientes[estado].descripcion;
  // }
  
  
}