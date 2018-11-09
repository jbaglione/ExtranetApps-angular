import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallazgosListService, PeriodicElement } from '../../../services/hallazgos/hallazgos.service';
import { listable } from '../../../models/listable.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Hallazgo } from 'src/app/models/hallazgo.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Destino } from 'src/app/models/destino.model';
import { Registracion } from 'src/app/models/registracion.model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hallazgo-detail',
  templateUrl: './hallazgo-detail.component.html',
  styleUrls: ['./hallazgo-detail.component.css']
})

export class HallazgoDetailComponent implements OnInit {
  id: string;

  hallazgo: Hallazgo = new Hallazgo();
  motivos: listable;
  estados: listable;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('ta_reg_descripcion') ta_reg_descripcion: ElementRef;
  dcRegistraciones: string[] = ['usuario', 'fecha', 'hora'];//', 'adjuntos', 'descripcion',
  mtRegistraciones = new MatTableDataSource();

  hallazgoForm: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute, private _hallazgosListService: HallazgosListService) {

    _activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this._hallazgosListService.GetMotivos().subscribe(data => this.motivos = data);
      this._hallazgosListService.GetEstados().subscribe(data => this.estados = data);

      //Creo el formulario con ReactiveForm
      this.hallazgoForm = new FormGroup({
        'numero': new FormControl({ value: '0', disabled: this.id !== 'nuevo' }, [Validators.required]),
        'fecha': new FormControl({ value: new Date(), disabled: this.id !== 'nuevo' }, [Validators.required]),
        'motivo': new FormControl({ value: '', disabled: this.id !== 'nuevo' }, [Validators.required]),
        'titulo': new FormControl({ value: '', disabled: this.id !== 'nuevo' }, [Validators.required]),
        'estado': new FormControl({ value: '', disabled: this.id !== 'nuevo' }, [Validators.required]),

        //Panel Registraciones detalle:
        'reg_descripcion': new FormControl('', [Validators.required]),
        'reg_adjuntos': new FormControl(),
      })

      if (this.id !== 'nuevo') {
        this._hallazgosListService.GetHallazgo(this.id).subscribe(data => {
          this.hallazgo = data;
          this.mtRegistraciones.data = data.registraciones;

          //Seteo los valores del formulario. (parchValue=algunos, setValue=todos.)
          this.hallazgoForm.patchValue({
            numero: this.hallazgo.nro,
            titulo: this.hallazgo.titulo,
            fecha: this.hallazgo.fecha,
            motivo: this.hallazgo.motivo.id,
            estado: this.hallazgo.estado.id
          });
        });
      }
    });
  }


  ngOnInit() {
    this.mtRegistraciones.sort = this.sort;
    // this.mtDestinos.sort = this.sort;
  }

  verRegistracion(registracion: Registracion) {

    // if(this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1].descripcion =='')
     if(registracion.id != 0 && this.hallazgoForm.controls.reg_descripcion.value == ''
     && this.hallazgo.registraciones[this.hallazgo.registraciones.length - 1].id == 0)
     
       this.ta_reg_descripcion.nativeElement.focus();
     else
      this.hallazgoForm.patchValue({
        reg_descripcion: registracion.descripcion,
        reg_adjuntos: registracion.adjuntos
      });
    // console.log(JSON.stringify(registracion));
  }

  // guardarHallazgo(newHero: Hero) {
  //   if (this.newHeroForm.valid) {
  //     this.heroService.createHero(newHero).subscribe((newHeroWithId) => {
  //       this.heroes.push(newHeroWithId);
  //       this.myNgForm.resetForm();
  //     }, (response: Response) => {
  //       if (response.status === 500) {
  //         this.error = 'errorHasOcurred';
  //       }
  //     });
  //   }
  // }
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
    debugger;
    console.log(this.hallazgoForm.value);
    if (this.hallazgoForm.valid) {

      let indice: number = this.hallazgo.registraciones.length - 1;
      this.hallazgo.registraciones[indice].descripcion = this.hallazgoForm.controls.reg_descripcion.value;
      this.hallazgo.registraciones[indice].adjuntos = this.hallazgoForm.controls.reg_adjuntos.value;
      this.hallazgo.registraciones[indice].hora = new Date().toTimeString().substring(0, 5);
      this.hallazgo.registraciones[indice].usuario = 'jonathan.baglione';
      // this.hallazgo.registraciones = null;

      this._hallazgosListService.CreateHallazgo(this.hallazgo).subscribe(() => {
        // this.hallazgo.push(newHeroWithId);
        // this.myNgForm.resetForm();
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