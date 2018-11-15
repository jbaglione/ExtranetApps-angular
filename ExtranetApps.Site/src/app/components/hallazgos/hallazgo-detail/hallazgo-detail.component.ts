import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallazgosListService, PeriodicElement } from '../../../services/hallazgos/hallazgos.service';
import { listable } from '../../../models/listable.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Hallazgo } from 'src/app/models/hallazgo.model';
import { MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Destino } from 'src/app/models/destino.model';
import { Registracion } from 'src/app/models/registracion.model';
import { Adjunto } from 'src/app/models/adjunto.model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DialogComponent} from '../../shared/dialog/dialog.component'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {} from 
@Component({
  selector: 'app-hallazgo-detail',
  templateUrl: './hallazgo-detail.component.html',
  styleUrls: ['./hallazgo-detail.component.css']
})

export class HallazgoDetailComponent implements OnInit {
  idRegistracionSeleccionada: number = 0;

  hallazgo: Hallazgo = new Hallazgo();
  motivos: listable;
  estados: listable;
  reg_adjuntos: Adjunto[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('ta_reg_descripcion') ta_reg_descripcion: ElementRef;
  dcRegistraciones: string[] = ['usuario', 'fecha', 'hora'];//', 'adjuntos', 'descripcion',
  mtRegistraciones = new MatTableDataSource();

  hallazgoForm: FormGroup;
  
  resultDialog: boolean;

  constructor(private _activatedRoute: ActivatedRoute,
    private _hallazgosListService: HallazgosListService,
    public dialog: MatDialog,
    private _router:Router) {
    _activatedRoute.params.subscribe(params => {
      this.hallazgo.id = params['id'] == 'nuevo' ? 0 : parseFloat(params['id']);
      this._hallazgosListService.GetMotivos().subscribe(data => this.motivos = data);
      this._hallazgosListService.GetEstados().subscribe(data => this.estados = data);

      //Creo el formulario con ReactiveForm
      this.hallazgoForm = new FormGroup({
        // 'id': new FormControl({ value: '0', }, [Validators.required]),
        'numero': new FormControl({ value: '0', disabled: this.hallazgo.id !== 0 }, [Validators.required]),
        'fecha': new FormControl({ value: new Date(), disabled: this.hallazgo.id !== 0 }, [Validators.required]),
        'motivo': new FormControl({ value: '', disabled: this.hallazgo.id !== 0 }, [Validators.required]),
        'titulo': new FormControl({ value: '', disabled: this.hallazgo.id !== 0 }, [Validators.required, Validators.minLength(3)]),
        'estado': new FormControl({ value: '1', disabled: true }, [Validators.required]),

        //Panel Registraciones detalle:
        'reg_descripcion': new FormControl('', [Validators.required]),
        // 'reg_adjuntos': new FormControl(),
      })

      if (this.hallazgo.id !== 0) {
        this._hallazgosListService.GetHallazgo(this.hallazgo.id).subscribe(data => {
          this.hallazgo = data;
          this.loadHallazgo();
        });
      }
    });
  }

  loadHallazgo(){
    debugger;
    if (this.hallazgo.motivo == null || this.hallazgo.estado == null || JSON.stringify(this.hallazgo.registraciones) == '[]'){
      this.resultDialog = false;
      this.openDialog("Error Datos", "Hubo un error en la carga de datos. ¿Desea abrir el registro igual?");
      //TODO: arreglar dialogo navegacion.
      //this._hallazgosListService.showSnackBar('Error en los datos');
    }
      
    if(this.hallazgo.registraciones == null || JSON.stringify(this.hallazgo.registraciones) == '[]'){
      this.hallazgo.registraciones.push(new Registracion());
      this.mtRegistraciones.data = this.hallazgo.registraciones;
    }
    else
      this.mtRegistraciones.data = this.hallazgo.registraciones;
   
    this.verRegistracion(this.hallazgo.registraciones[0]);
    //Seteo los valores del formulario. (parchValue=algunos, setValue=todos.)
    this.hallazgoForm.patchValue({
      // id: this.hallazgo.id,
      numero: this.hallazgo.nro,
      titulo: this.hallazgo.titulo,
      fecha: this.hallazgo.fecha,
      motivo: this.hallazgo.motivo == null ? new listable("1", "") : this.hallazgo.motivo.id,
      estado: this.hallazgo.estado == null ? new listable("1", "") : this.hallazgo.estado.id,
    });
  }

  openDialog(pTitle:string, pContent:string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: pTitle, content: pContent}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.resultDialog = result;
      //TODO: arreglar dialogo navegacion.
      if(!this.resultDialog){
        this._router.navigate(['/hallazgos']);
      }
      console.log(this.resultDialog);
    });
  }
  ngOnInit() {
    this.mtRegistraciones.sort = this.sort;
    // this.mtDestinos.sort = this.sort;
  }

  verRegistracion(registracion: Registracion) {
    
    // if(this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1].descripcion =='')
    if (registracion.id != 0 && this.hallazgoForm.controls.reg_descripcion.value == ''
      && this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1].id == 0)

      this.ta_reg_descripcion.nativeElement.focus();
    else {
      this.hallazgoForm.patchValue({
        reg_descripcion: registracion.descripcion,
        // reg_adjuntos: registracion.adjuntos,
      });
      this.idRegistracionSeleccionada = registracion.id;
      this.reg_adjuntos = registracion.adjuntos;

      console.log(registracion);
      console.log(this.idRegistracionSeleccionada);
    }

    // console.log(JSON.stringify(registracion));
  }

  nuevaRegistracion() {
    this.hallazgo.registraciones.push(new Registracion);
    this.mtRegistraciones.data = this.hallazgo.registraciones;
    this.verRegistracion(this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1]);
    this.ta_reg_descripcion.nativeElement.focus();
    console.log(this.hallazgo);
  }
  CheckForm() {
    console.log(this.hallazgoForm.value);
  }


  guardarHallazgo() {
    console.log(this.hallazgoForm.value);
    if (this.hallazgoForm.valid) {

      let indice: number = this.hallazgo.registraciones.length - 1;

      // this.hallazgo.nro = this.hallazgoForm.controls.nro.value;
      this.hallazgo.titulo = this.hallazgoForm.controls.titulo.value;
      this.hallazgo.fecha = this.hallazgoForm.controls.fecha.value;
      this.hallazgo.motivo = new listable(this.hallazgoForm.controls.motivo.value, "");
      debugger;
      this.hallazgo.estado = new listable(this.hallazgoForm.controls.estado.value, "");

      this.hallazgo.registraciones[indice].descripcion = this.hallazgoForm.controls.reg_descripcion.value;
      // this.hallazgo.registraciones[indice].adjuntos = this.reg_adjuntos;
      this.hallazgo.registraciones[indice].hora = new Date().toTimeString().substring(0, 5);
      this.hallazgo.registraciones[indice].usuario = 'jonathan.baglione';
      // this.hallazgo.registraciones = null;

      this._hallazgosListService.CreateHallazgo(this.hallazgo).subscribe((newHallazgo) => {
        console.log(JSON.stringify(newHallazgo));
        this.hallazgo = newHallazgo as Hallazgo;
        this.loadHallazgo();
      }, (response: Response) => {
        if (response.status === 500) {
          console.log('errorHasOcurred');
        }
      });
      // this.reg_descripcion = registracion.descripcion;
      // this.reg_adjuntos = registracion.adjuntos;
      // console.log(JSON.stringify(registracion));
    }
  }
}



