import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Technology } from '../models/technology.model';
import { RESTTechnologyService } from '../services/resttechnology.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit{
  constructor(private restAPI: RESTTechnologyService, private router : Router, private authService: AuthService) {}
  displayedColumns: string[] = ['name', 'category', 'ring'];
  dataSource = new MatTableDataSource<Technology>()
  currisAdmin$!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(){
    this.getAllPublishedTechs();
    this.currisAdmin$ = this.authService.currAdmin;
    if(this.currisAdmin$ && !this.displayedColumns.includes('actions')){
      this.displayedColumns.push("actions");
    } else {
      this.displayedColumns.push("description");
      this.displayedColumns.push("descriptionClassification");
    }
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  getAllPublishedTechs(){
    this.restAPI.getPublishedTechnologies().subscribe((data : Technology[] ) => {
      this.dataSource.data = data;
    });

  }
  getUnPublishedTechs(){
    this.restAPI.getUnPublishedTechnologies().subscribe((data : Technology[] ) => {
      this.dataSource.data = data;
    });
  }
  editTech(technologyId : any){
    //route to edition page
    this.router.navigate(["/tech/"+technologyId]);
  }

  deleteTech(technologyId: any){
    this.restAPI.deleteTechnology(technologyId).subscribe((data : Technology ) => {
       //reload
       this.getAllPublishedTechs();
    });
  }

  publishTech(technologyId: any){
    this.restAPI.updateTechnology(technologyId, {published : true, publishDate: Date.now()}).subscribe((data : Technology ) => {
      //reload
      this.getUnPublishedTechs();
   });
  }


}
