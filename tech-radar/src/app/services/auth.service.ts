import { environment } from 'src/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, retry, throwError  } from 'rxjs'; 
import { User } from '../models/user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as shajs from 'js-sha256';
import { } from 'rxjs';


  
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.validateToken());
  private current_username = new BehaviorSubject<string>('');
  private current_isAdmin = new BehaviorSubject<boolean>(false);
  isLoaded = false;

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }
  get currUsername(){
    return this.current_username.value;
  }
  get currAdmin(){
    return this.current_isAdmin.value;
  }

  ngOnInit(){
    this.isLoaded = true;
  }
  constructor(private router: Router, private http: HttpClient) { }

  //set content-type
  options = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': ''
      }),
    
  };
  apiHost =  environment.apiAdress+":"+environment.apiPort;
 

  login(user: User){
    const loginData = {
      email: user.email,
      password: shajs.sha256(user.password)
    }
    let data = this.http.post<User>(this.apiHost+'/api/login/', loginData, this.options)
                    .pipe(retry(1), catchError(this.errorHandler));
    data.subscribe(data => {
      if(data.accessToken){
        localStorage.setItem('access-token', data.accessToken);
        this.current_username.next(data.username || '');
        this.current_isAdmin.next(data.isAdmin ? true : false) ;
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      }else {
        localStorage.removeItem('access-token');
        this.loggedIn.next(false);
      }
    });
      
  }

  logout(){
    localStorage.removeItem('access-token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  validateToken() : boolean{
    let _options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('access-token') || ''
        }),
    };

    if(this.isLoaded){//timing issue no clue why
        let data = this.http.get<any>(this.apiHost+'/api/login/validateToken', _options);
        data.subscribe(data => {
          if(data.message == 'valid'){
              return true;
          } else {
            this.logout();
            return false;
          }
        });
    }
    return false;
  }



  errorHandler(error: any){
      let message= error.error instanceof ErrorEvent ? error.error.message : `Error Code: ${error.status}\nMesage: ${error.message}` ;
      //window.alert(message);
      return throwError(() => {
        return message;
      })
  }

}
