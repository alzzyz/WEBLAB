import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-historydialog',
  templateUrl: './historydialog.component.html',
  styleUrls: ['./historydialog.component.scss']
})
export class HistorydialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data : Array<Object>){}

  history: any;

  
  ngOnInit(){
    this.history = this.data;  
  }
}
