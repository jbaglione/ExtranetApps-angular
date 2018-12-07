import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
// implements OnInit
export class UploadComponent  {
  @Input() path:string;
  @Output() emitirData: EventEmitter<any> = new EventEmitter();
  public data:string;
  // visible: boolean = true;
  // @Output() close: EventEmitter<any> = new EventEmitter();
  // toggle() {
  //   this.visible = !this.visible;
  //   if (this.visible) {
  //     this.open.emit(null);
  //   } else {
  //     this.close.emit(null);
  //   }
  // }

  //Originalmente, la idea era devolver la lista de archivos guardados.
  returnData(event){
    this.data = "OK";
    this.emitirData.emit(this.data);
  }

  public datos:string;

  constructor(public dialog: MatDialog, public uploadService: UploadService) {
    dialog.afterAllClosed
    .subscribe(() => {
      debugger;
      console.log('afterAllClosed');+
    // update a variable or call a function when the dialog closes
      this.returnData(event);
    }
  );
  }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent , { width: '50%', height: '50%', data: {path: this.path}});
  }
}