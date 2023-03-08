import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) {   }

 
  success(message: string){
    return this._snackbar.open(message, "OK", { horizontalPosition:"center", verticalPosition: "top" ,duration: 5000, panelClass: ['snackbar-success']})
  };

  error(message: string){
    return this._snackbar.open(message, "OK", { horizontalPosition:"center", verticalPosition: "top" ,duration: 5000, panelClass: ['snackbar-error']})
  }

  info(message: string){
    return this._snackbar.open(message, "OK",  { horizontalPosition:"center", verticalPosition: "top" ,duration: 5000, panelClass: ['snackbar-info']})
  }

  openSnackBar(message:string, action:string,  panelClass:string){
    return this._snackbar.open(message, action, {panelClass: [`${panelClass}`]})
  }
}
