import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(map((actuallyLoggedIn: boolean) => {
      if(!actuallyLoggedIn){
        this.router.navigate(['/login']);
        return false;
      }
      //this.router.navigate(["/"])
      return true;
    }))
  }
  
}
