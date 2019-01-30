import { Component, Inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

import { ClientesGestion } from 'src/app/models/clientes-gestion';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Adjunto } from 'src/app/models/adjunto.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GestionesService} from '../../../../services/actividades-clientes/gestiones.service';
import { DialogComponent } from '../../../shared/dialog/dialog.component'
import { CommonService } from '../../../../services/common.service';
import { listable } from '../../../../models/listable.model';
import { ClienteAdjuntos } from 'src/app/models/clienteAdjuntos.model';

// import { Title } from '@angular/platform-browser';
// import { SelectionModel } from '@angular/cdk/collections';
// import { Destino } from 'src/app/models/destino.model';
// import { getLocaleDateTimeFormat } from '@angular/common';
// import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-gestion-detail',
  templateUrl: './gestion-detail.component.html',
  styleUrls: ['./gestion-detail.component.css']
})

export class GestionDetailComponent {
  

  idRegistracionSeleccionada: number = 0;
  
  gestion: ClientesGestion = new ClientesGestion();
  tiposGestion: listable;
  adjunto: ClienteAdjuntos;
  gestionForm: FormGroup;
  resultDialog: boolean;
  //Usar si quiero mostrar el nuevo numero antes.
  newGestionNro:number;
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<GestionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GestionesDialogData,
    private gestionesService: GestionesService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    
      this.gestion.Id = data.id == 'nuevo' ? 0 : parseFloat(data.id);
      this.gestion.clienteId = parseFloat(data.clienteId);
      this.gestionesService.GetTiposGestion().subscribe(data => this.tiposGestion = data);

      this.gestionForm = new FormGroup({
        
        'fecha': new FormControl({ value: new Date(), disabled: false }, [Validators.required]),
        'tipoGestion': new FormControl({ value: '0', disabled: false }, [Validators.required]),
        'adjunto': new FormControl({ value: '0', disabled: this.gestion.Id !== 0 }),
        'observaciones': new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(3)]),
        'fechaRecontacto': new FormControl({ value: new Date(), disabled: false }),
      })
     
      if (this.gestion.Id !== 0) {
        this.gestionesService.GetGestion(this.gestion.Id).subscribe(data => {
          this.gestion = data;
          this.loadGestion();
          commonService.setTitulo("Registro de Gestiones");
        });
      }
      else
      commonService.setTitulo("Nueva Gestion");
    
  }

reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
}

onFileChange(event) {
  let reader = new FileReader();
  this.myInputVariable.nativeElement.value;
 debugger;
  if(event.target.files && event.target.files.length) {
    if(event.target.files[0].type != 'application/pdf')
    {
      alert(event.target.files[0].name + " no es un archivo pdf valido");
      event.target.files = null;
      this.reset();
      this.cd.markForCheck();
      return;
    }
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.gestionForm.patchValue({
        adjunto: reader.result
      });
      
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
    };
  }
}

  loadGestion() {
    if (this.gestion.fecha == null || this.gestion.tipoGestion == null || this.gestion.observaciones == null) {
      this.resultDialog = false;
      this.openDialog("Error Datos", "Hubo un error en la carga de datos. ¿Desea abrir el registro igual?");
      //TODO: arreglar dialogo navegacion.
      //this.gestionesService.showSnackBar('Error en los datos');
    }

    //Seteo los valores del formulario. (parchValue=algunos, setValue=todos.)
    this.gestionForm.patchValue({
      // id: this.gestion.id,
      fecha: this.gestion.fecha,
      tipoGestion: this.gestion.tipoGestion,
      observaciones: this.gestion.observaciones,
      fechaRecontacto: this.gestion.fechaRecontacto
      // ,adjunto: this.gestion.adjunto,
    });
  }

  openDialog(pTitle: string, pContent: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: pTitle, content: pContent }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.resultDialog = result;
      //TODO: arreglar dialogo navegacion.
      if (!this.resultDialog) {
          this.dialogRef.close();
      }
      console.log(this.resultDialog);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  CheckForm() {
    console.log(this.gestionForm.value);
  }

   guardarGestion() {
    console.log(this.gestionForm.value);
    if (this.gestionForm.valid) {

debugger;
      this.gestion.fecha = this.gestionForm.controls.fecha.value;
      this.gestion.tipoGestion = new listable(this.gestionForm.controls.tipoGestion.value, "");
      this.gestion.observaciones = this.gestionForm.controls.observaciones.value;
      this.gestion.fechaRecontacto = this.gestionForm.controls.fechaRecontacto.value;
      this.gestion.adjunto.archivo = this.gestionForm.controls.adjunto.value;
      // this.gestion.adjunto.name = this.myInputVariable.nativeElement.files[0].name;

      this.gestionesService.CreateClientesGestion(this.gestion).subscribe((newGestion) => {
        console.log(JSON.stringify(newGestion));
        this.gestion = newGestion as ClientesGestion;
        this.loadGestion();
      }, (response: Response) => {
        if (response.status === 500) {
          console.log('errorHasOcurred');
        }
      });
    }
  }

  recargarAdjuntos(event){
    
    if(event == "OK")
    {
      if (this.gestion.Id !== 0) {
        this.gestionesService.GetGestion(this.gestion.Id).subscribe(data => {
          this.adjunto = this.gestion.adjunto;
        });
      }
    }
  }
}

export interface GestionesDialogData {
  id: string;
  clienteId: string;
  acceso: string;
}