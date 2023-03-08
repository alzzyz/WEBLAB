import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RESTTechnologyService } from '../services/resttechnology.service';
import { first } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HistorydialogComponent } from '../historydialog/historydialog.component';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',  styleUrls: ['./tech.component.scss']
})
export class TechComponent implements OnInit{
  
  form! : FormGroup;
  id!: string;
  isEditting!: boolean;
  categories = ['Techniques', 'Tools', 'Platforms', 'Languages & frameworks'];
  rings = ['Adopt', 'Assess', 'Hold', 'Trial'];
  history!: Array<Object>;
  constructor(private dialog: MatDialog, private _snack: SnackbarService ,private formB: FormBuilder, private router: Router, private route: ActivatedRoute, private restAPI: RESTTechnologyService ){}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] //check if id is provided, if so swap to editmode
    this.isEditting = !!this.id;
    
    this.form = this.formB.group({
      name : ['', Validators.required],
      category : ['', Validators.required],
      ring : [''],
      description : ['', Validators.required],
      descriptionClassification :  ['']
    });

    if(this.isEditting){
      this.restAPI.getTechnology(this.id)
                  .pipe(first())
                  .subscribe(tech => {
                    
                    //form data
                    this.form.patchValue(tech);

                    //history
                    this.history = tech.changes;
                  });
      
        

    }
   
  }
    
  onSubmit(){
    if(this.form.invalid){
      return; // you should be here >:(
    } 

    if(this.isEditting){
      this.editTechData();
    } else {
      this.addTechData();
    }

  }

  addTechData(){
    if(this.form.valid){
      this.restAPI.createTechnology(this.form.value)
                  .pipe(first())
                  .subscribe({
                    next: () => {
                      this._snack.success("Technology added");
                      this.router.navigate(["/"]);
                    },
                    error: error => {
                      this._snack.error("Something went wrong");
                    }

                  });
    }
  }

  editTechData(){
    if(this.form.valid){
      this.restAPI.updateTechnology(this.id,this.form.value)
                  .pipe(first())
                  .subscribe({
                    next: () => {
                      this._snack.success("Technology edited");
                      this.router.navigate(["/"])
                    },
                    error: error => {
                      this._snack.error("Something went wrong");
                    }
                  })
    }
  };

  showHistory(){
    this.dialog.open(HistorydialogComponent, {
      data: this.history,
      width: '400px'
    });
  }
}
