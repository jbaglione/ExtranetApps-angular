import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HallazgosService} from '../../../services/hallazgos/hallazgos.service';
import { CommonService } from '../../../services/common.service';
import { listable } from '../../../models/listable.model';
import { Hallazgo } from 'src/app/models/hallazgo.model';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Registracion } from 'src/app/models/registracion.model';
import { Adjunto } from 'src/app/models/adjunto.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogComponent } from '../../shared/dialog/dialog.component'
import { ActivatedRoute, Router } from '@angular/router';

// import { Title } from '@angular/platform-browser';
// import { SelectionModel } from '@angular/cdk/collections';
// import { Destino } from 'src/app/models/destino.model';
// import { getLocaleDateTimeFormat } from '@angular/common';
// import { Usuario } from 'src/app/models/usuario.model';

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
  highlightedRows = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('ta_reg_descripcion') ta_reg_descripcion: ElementRef;
  dcRegistraciones: string[] = ['usuario', 'fecha', 'hora'];//', 'adjuntos', 'descripcion',
  mtRegistraciones = new MatTableDataSource();

  hallazgoForm: FormGroup;

  resultDialog: boolean;
  //Usar si quiero mostrar el nuevo numero antes.
  newHallazgoNro:number;

  constructor(
    private hallazgosService: HallazgosService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      this.hallazgo.id = params['id'] == 'nuevo' ? 0 : parseFloat(params['id']);
      this.hallazgosService.GetMotivos().subscribe(data => this.motivos = data);
      this.hallazgosService.GetEstados().subscribe(data => this.estados = data);
      //Usar si quiero mostrar el nuevo numero antes.
      //this.hallazgosService.GetNewHallazgoNro().subscribe(data => this.newHallazgoNro = data);

      //Creo el formulario con ReactiveForm
      this.hallazgoForm = new FormGroup({
        // 'id': new FormControl({ value: '0', }, [Validators.required]),
        'numero': new FormControl({ value: '0', disabled: this.hallazgo.id !== 0 }, [Validators.required]),
        'fecha': new FormControl({ value: new Date(), disabled: this.hallazgo.id !== 0 }, [Validators.required]),
        'motivo': new FormControl({ value: '', disabled: this.hallazgo.id !== 0 }, [Validators.required]),
        'titulo': new FormControl({ value: '', disabled: this.hallazgo.id !== 0 }, [Validators.required, Validators.minLength(3)]),
        'estado': new FormControl({ value: '0', disabled: true }, [Validators.required]),

        //Panel Registraciones detalle:
        'reg_descripcion': new FormControl('', [Validators.required]),
        // 'reg_adjuntos': new FormControl(),
      })
     
      if (this.hallazgo.id !== 0) {
        this.hallazgosService.GetHallazgo(this.hallazgo.id).subscribe(data => {
          this.hallazgo = data;
          this.loadHallazgo();
          commonService.setTitulo("Hallazgo " + this.hallazgo.titulo)
        });
      }
      else
      commonService.setTitulo("Nuevo Hallazgo");
    });
  }

  verRegistracion(row: any) {
    let registracion = new Registracion();
    
    registracion.id = parseInt(row["id"]);
    registracion.adjuntos = row["adjuntos"];
    registracion.descripcion = row["descripcion"]
    // if(this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1].descripcion =='')
    if (registracion.id != 0 && this.hallazgoForm.controls.reg_descripcion.value == ''
      && this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1].id == 0)

      this.ta_reg_descripcion.nativeElement.focus();
    else {
      this.highlightedRows = [];
      this.highlightedRows.push(row);
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

  loadHallazgo() {
    if (this.hallazgo.motivo == null || this.hallazgo.estado == null || JSON.stringify(this.hallazgo.registraciones) == '[]') {
      this.resultDialog = false;
      this.openDialog("Error Datos", "Hubo un error en la carga de datos. ¿Desea abrir el registro igual?");
      //TODO: arreglar dialogo navegacion.
      //this.hallazgosService.showSnackBar('Error en los datos');
    }

    if (this.hallazgo.registraciones == null || JSON.stringify(this.hallazgo.registraciones) == '[]') {
      this.hallazgo.registraciones.push(new Registracion());
      this.mtRegistraciones.data = this.hallazgo.registraciones;
    }
    else
      this.mtRegistraciones.data = this.hallazgo.registraciones;

    this.verRegistracion(this.hallazgo.registraciones[0])
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
        this.router.navigate(['/hallazgos']);
      }
      console.log(this.resultDialog);
    });
  }
  ngOnInit() {
    this.mtRegistraciones.sort = this.sort;
    // this.mtDestinos.sort = this.sort;
  }

  // verRegistracion(registracion: Registracion) {

  //   // if(this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1].descripcion =='')
  //   if (registracion.id != 0 && this.hallazgoForm.controls.reg_descripcion.value == ''
  //     && this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1].id == 0)

  //     this.ta_reg_descripcion.nativeElement.focus();
  //   else {
  //     this.hallazgoForm.patchValue({
  //       reg_descripcion: registracion.descripcion,
  //       // reg_adjuntos: registracion.adjuntos,
  //     });
  //     this.idRegistracionSeleccionada = registracion.id;
  //     this.reg_adjuntos = registracion.adjuntos;

  //     console.log(registracion);
  //     console.log(this.idRegistracionSeleccionada);
  //   }
  //   // console.log(JSON.stringify(registracion));
  // }

  nuevaRegistracion() {
    this.hallazgo.registraciones.push(new Registracion);
    this.mtRegistraciones.data = this.hallazgo.registraciones;

    this.verRegistracion(this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1])
    // this.verRegistracion(this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1]);
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
      this.hallazgo.estado = new listable(this.hallazgoForm.controls.estado.value, "");

      this.hallazgo.registraciones[indice].descripcion = this.hallazgoForm.controls.reg_descripcion.value;
      // this.hallazgo.registraciones[indice].adjuntos = this.reg_adjuntos;
      this.hallazgo.registraciones[indice].hora = new Date().toTimeString().substring(0, 5);
      this.hallazgo.registraciones[indice].usuario = 'jonathan.baglione';
      // this.hallazgo.registraciones = null;

      this.hallazgosService.CreateHallazgo(this.hallazgo).subscribe((newHallazgo) => {
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

  recargarAdjuntos(event){
    
    if(event == "OK")
    {
      if (this.hallazgo.id !== 0) {
        this.hallazgosService.GetHallazgo(this.hallazgo.id).subscribe(data => {
          this.hallazgo.registraciones = data.registraciones;
          this.mtRegistraciones.data = this.hallazgo.registraciones;
          this.reg_adjuntos = this.hallazgo.registraciones.find(x=>x.id == this.idRegistracionSeleccionada).adjuntos;
          // this.loadHallazgo();
        });
      }
    }
    // // this.idRegistracionSeleccionada
    // let adj:Adjunto = new Adjunto();
    // adj.name = "nuevo";
    // this.reg_adjuntos.push(adj);
    // console.log(event);
  }
  GetNroRegistros()
  {
    if(this.reg_adjuntos!=null)
    return this.reg_adjuntos.length;
    else return 0;
  }
}