import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { AuthenticationService } from '../../../../services/authentication.service';
import { CommonService } from '../../../../services/common.service';

import { ClientesGestion } from 'src/app/models/clientes-gestion';
import { GestionesService } from '../../../../services/actividades-clientes/gestiones.service';
import { Router } from '@angular/router';
import { GestionDetailComponent } from '../gestion-detail/gestion-detail.component';

@Component({
  selector: 'app-actividades-clientes-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css']
})

export class GestionesComponent implements OnInit {
  @Input() clienteId:number;
  dcClientesGestiones: string[] = ['fecha', 'estado', 'observaciones', 'fechaRecontacto', 'adjunto', 'edit', 'delete'];
  mtClientesGestiones: MatTableDataSource<ClientesGestion>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  userToken: string;
  userAcceso: string;

  constructor(
    private gestionesService: GestionesService,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private router: Router,
    public dialog: MatDialog) {

    commonService.setTitulo("Gestiones de Clientes");
    this.userAcceso = this.authenticationService.currentUserValue.acceso;
  }

  ngOnInit() {
    this.gestionesService.GetGestiones(this.clienteId).subscribe(data => {
      
      this.mtClientesGestiones = new MatTableDataSource(data)
      this.mtClientesGestiones.paginator = this.paginator;
      this.mtClientesGestiones.sort = this.sort;
    });
  }
  // verGestion(id: any) {
  //   console.log(this.mtClientesGestiones.data);
  //   this.router.navigate(['actividadesclientes/gestiones/detail', id]);
  // }

  verGestion(id: number = 0): void {
    //  this.downloadContrato(paramClienteId);
    
    const dialogRef = this.dialog.open(GestionDetailComponent, {
      width: '95vw',
      // height: '95%',
       maxWidth: '700px',
      // panelClass: 'my-panel',
      data: { id: id, clienteId: this.clienteId, acceso:this.userAcceso}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}