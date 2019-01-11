import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppConfig } from '../../../configs/app.config'

@Component({
  selector: 'app-afiliaciones-detail',
  templateUrl: './afiliaciones-detail.component.html',
  styleUrls: ['./afiliaciones-detail.component.css']
})
export class AfiliacionesDetailComponent implements OnInit {

  url_1: string = AppConfig.endpoints.oldExranet + 'afiliacionesPopUp?GetDirectClienteId=';
  url_2: string = '&GetDirectSolicitud=true';
  urlFinal: string;
  constructor(
    public dialogRef: MatDialogRef<AfiliacionesDetailComponent>
    , @Inject(MAT_DIALOG_DATA) public data: AfiliacionesDialogData
  ) {
    debugger;
    this.urlFinal = this.url_1 + data.clienteId + this.url_2;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

export interface AfiliacionesDialogData {
  clienteId: string;
}