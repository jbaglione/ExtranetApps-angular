import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BitacorasService } from '../../../services/bitacoras/bitacoras.service';
import { CommonService } from '../../../services/common.service';
import { listable } from '../../../models/listable.model';
import { Bitacora } from 'src/app/models/bitacora.model';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Registracion } from 'src/app/models/registracion.model';
import { Adjunto } from 'src/app/models/adjunto.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogComponent } from '../../shared/dialog/dialog.component'
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';

// import { Title } from '@angular/platform-browser';
// import { SelectionModel } from '@angular/cdk/collections';
// import { Destino } from 'src/app/models/destino.model';
// import { getLocaleDateTimeFormat } from '@angular/common';
// import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-bitacora-detail',
  templateUrl: './bitacora-detail.component.html',
  styleUrls: ['./bitacora-detail.component.css']
})

export class BitacoraDetailComponent implements OnInit {
  idRegistracionSeleccionada: number = 0;

  bitacora: Bitacora = new Bitacora();
  motivos: listable;
  estados: listable;
  reg_adjuntos: Adjunto[] = [];
  highlightedRows = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('ta_reg_descripcion') ta_reg_descripcion: ElementRef;
  dcRegistraciones: string[] = ['usuario', 'fecha', 'hora'];//', 'adjuntos', 'descripcion',
  mtRegistraciones = new MatTableDataSource();

  bitacoraForm: FormGroup;

  resultDialog: boolean;
  //Usar si quiero mostrar el nuevo numero antes.
  newBitacoraNro: number;

  constructor(
    private bitacorasService: BitacorasService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.bitacora.id = params['id'] == 'nuevo' ? 0 : parseFloat(params['id']);
      this.bitacorasService.GetMotivos().subscribe(data => this.motivos = data);
      this.bitacorasService.GetEstados().subscribe(data => this.estados = data);
      //Usar si quiero mostrar el nuevo numero antes.
      //this.bitacorasService.GetNewBitacoraNro().subscribe(data => this.newBitacoraNro = data);

      //Creo el formulario con ReactiveForm
      this.bitacoraForm = new FormGroup({
        // 'id': new FormControl({ value: '0', }, [Validators.required]),
        'numero': new FormControl({ value: '0', disabled: this.bitacora.id !== 0 }, [Validators.required]),
        'fecha': new FormControl({ value: new Date(), disabled: this.bitacora.id !== 0 }, [Validators.required]),
        'motivo': new FormControl({ value: '', disabled: this.bitacora.id !== 0 }, [Validators.required]),
        'titulo': new FormControl({ value: '', disabled: this.bitacora.id !== 0 }, [Validators.required, Validators.minLength(3)]),
        'estado': new FormControl({ value: '0', disabled: true }, [Validators.required]),

        //Panel Registraciones detalle:
        'reg_descripcion': new FormControl('', [Validators.required]),
        // 'reg_adjuntos': new FormControl(),
      })

      if (this.bitacora.id !== 0) {
        this.bitacorasService.GetBitacora(this.bitacora.id).subscribe(data => {
          this.bitacora = data;
          this.loadBitacora();
          commonService.setTitulo("Bitacora " + this.bitacora.titulo)
        });
      }
      else
        commonService.setTitulo("Nueva Bitacora");
    });
  }

  verRegistracion(row: any) {
    debugger;
    let registracion = new Registracion();

    registracion.id = parseInt(row["id"]);
    registracion.adjuntos = row["adjuntos"];
    registracion.descripcion = row["descripcion"]
    // if(this.bitacora.registraciones[this.bitacora.registraciones.length - 1].descripcion =='')
    if (registracion.id != 0 && this.bitacoraForm.controls.reg_descripcion.value == ''
      && this.bitacora.registraciones[this.bitacora.registraciones.length - 1].id == 0)

      this.ta_reg_descripcion.nativeElement.focus();
    else {
      this.highlightedRows = [];
      this.highlightedRows.push(row);
      this.bitacoraForm.patchValue({
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

  loadBitacora() {
    debugger;
    if (this.bitacora.motivo == null || this.bitacora.estado == null || JSON.stringify(this.bitacora.registraciones) == '[]') {
      this.resultDialog = false;
      this.openDialog("Error Datos", "Hubo un error en la carga de datos. ¿Desea abrir el registro igual?");
      return;
      //TODO: arreglar dialogo navegacion.
      //this.bitacorasService.showSnackBar('Error en los datos');
    }

    if (this.bitacora.registraciones == null || JSON.stringify(this.bitacora.registraciones) == '[]') {
      this.bitacora.registraciones.push(new Registracion());
      this.mtRegistraciones.data = this.bitacora.registraciones;
    }
    else
      this.mtRegistraciones.data = this.bitacora.registraciones;

    this.verRegistracion(this.bitacora.registraciones[this.bitacora.registraciones.length - 1]);
    // if (this.idRegistracionSeleccionada > 0)
    //   this.verRegistracion(this.bitacora.registraciones.find(x => x.id == this.idRegistracionSeleccionada));
    // else if (this.bitacora.registraciones.length > 0)
    //   this.verRegistracion(this.bitacora.registraciones[0]);

    //Seteo los valores del formulario. (parchValue=algunos, setValue=todos.)
    this.bitacoraForm.patchValue({
      // id: this.bitacora.id,
      numero: this.bitacora.nro,
      titulo: this.bitacora.titulo,
      fecha: this.bitacora.fecha,
      motivo: this.bitacora.motivo == null ? new listable("1", "") : this.bitacora.motivo.id,
      estado: this.bitacora.estado == null ? new listable("1", "") : this.bitacora.estado.id,
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
        this.router.navigate(['/bitacoras']);
      }
      console.log(this.resultDialog);
    });
  }
  ngOnInit() {
    this.mtRegistraciones.sort = this.sort;
    // this.mtDestinos.sort = this.sort;
  }

  nuevaRegistracion() {
    if (this.bitacora.registraciones.length == 9) {
      this.commonService.showSnackBar("No se pueden cargar mas registros a esta Bitacora");
      return;
    }

    this.bitacora.registraciones.push(new Registracion);
    this.mtRegistraciones.data = this.bitacora.registraciones;

    this.verRegistracion(this.bitacora.registraciones[this.bitacora.registraciones.length - 1])
    // this.verRegistracion(this.bitacora.registraciones[this.bitacora.registraciones.length - 1]);
    this.ta_reg_descripcion.nativeElement.focus();
    console.log(this.bitacora);
  }
  CheckForm() {
    console.log(this.bitacoraForm.value);
  }

  guardarBitacora() {
    console.log(this.bitacoraForm.value);
    if (this.bitacoraForm.valid) {

      let indice: number = this.bitacora.registraciones.length - 1;

      // this.bitacora.nro = this.bitacoraForm.controls.nro.value;
      this.bitacora.titulo = this.bitacoraForm.controls.titulo.value;
      this.bitacora.fecha = this.bitacoraForm.controls.fecha.value;
      this.bitacora.motivo = new listable(this.bitacoraForm.controls.motivo.value, "");
      this.bitacora.estado = new listable(this.bitacoraForm.controls.estado.value, "");

      this.bitacora.registraciones[indice].descripcion = this.bitacoraForm.controls.reg_descripcion.value;
      // this.bitacora.registraciones[indice].adjuntos = this.reg_adjuntos;
      this.bitacora.registraciones[indice].hora = new Date().toTimeString().substring(0, 5);
      this.bitacora.registraciones[indice].usuario = 'jonathan.baglione';
      // this.bitacora.registraciones = null;

      this.bitacorasService.CreateBitacora(this.bitacora).subscribe((newBitacora) => {
        debugger;
        if (newBitacora != null && newBitacora != undefined) {
          console.log(JSON.stringify(newBitacora));
          this.bitacora = newBitacora as Bitacora;
          this.loadBitacora();
        }

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

  recargarAdjuntos(event) {

    if (event == "OK") {
      if (this.bitacora.id !== 0) {
        this.bitacorasService.GetBitacora(this.bitacora.id).subscribe(data => {
          this.bitacora.registraciones = data.registraciones;
          this.mtRegistraciones.data = this.bitacora.registraciones;
          let reg: Registracion = this.bitacora.registraciones.find(x => x.id == this.idRegistracionSeleccionada);
          this.reg_adjuntos = reg.adjuntos;
          this.verRegistracion(reg);
        });
      }
    }
    // // this.idRegistracionSeleccionada
    // let adj:Adjunto = new Adjunto();
    // adj.name = "nuevo";
    // this.reg_adjuntos.push(adj);
    // console.log(event);
  }
  GetNroRegistros() {
    if (this.reg_adjuntos != null)
      return this.reg_adjuntos.length;
    else return 0;
  }
}