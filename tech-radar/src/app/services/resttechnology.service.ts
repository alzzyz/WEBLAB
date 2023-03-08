import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environment';
import { Technology } from '../models/technology.model';


@Injectable({
  providedIn: 'root'
})
export class RESTTechnologyService {

  constructor(private http:HttpClient) {  }
 
  apiHost =  environment.apiAdress+":"+environment.apiPort;

  options =  {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('access-token') || ''
      }),
    
  };
  //load dynamically
  getHttpOptions(){
     let options =  {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('access-token') || ''
        }),
      
    };
    return options
  }
  

  //CRUD OPERATIONS
  
  getPublishedTechnologies(): Observable<Technology[]>{
    return this.http.get<Technology[]>(this.apiHost+'/api/tech/published', this.getHttpOptions())
                    .pipe(retry(1), catchError(this.errorHandler));
  }

  getUnPublishedTechnologies(): Observable<Technology[]>{
    return this.http.get<Technology[]>(this.apiHost+'/api/tech/unpublished', this.getHttpOptions())
                    .pipe(retry(1), catchError(this.errorHandler));
  }

  //requires admin
  getAllTechnologies(): Observable<Technology[]>{
    return this.http.get<Technology[]>(this.apiHost+'/api/tech/', this.getHttpOptions())
                    .pipe(retry(1), catchError(this.errorHandler));
  }
 
  getTechnology(id: any): Observable<Technology>{
    return this.http.get<Technology>(this.apiHost+'/api/tech/'+id, this.getHttpOptions())
                    .pipe(retry(1), catchError(this.errorHandler));
  }

  createTechnology(technology: any): Observable<Technology>{
    return this.http.post<Technology>(this.apiHost+'/api/tech/', JSON.stringify(technology), this.getHttpOptions())
                    .pipe(retry(1), catchError(this.errorHandler));
  }

  updateTechnology(id: any, technology: any): Observable<Technology>{
    return this.http.put<Technology>(this.apiHost+'/api/tech/'+id, JSON.stringify(technology), this.getHttpOptions())
                    .pipe(retry(1), catchError(this.errorHandler));
  }

  deleteTechnology(id: any): Observable<Technology>{
    return this.http.delete<Technology>(this.apiHost+'/api/tech/'+id, this.getHttpOptions())
                    .pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error: any){
      let message= error.error instanceof ErrorEvent ? error.error.message : `Error Code: ${error.status}\nMesage: ${error.message}` ;
      window.alert(message);
      return throwError(() => {
        return message;
      })
  }

}
