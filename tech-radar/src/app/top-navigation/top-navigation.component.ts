import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent  implements OnInit{
  isLoggedIn$!: Observable<boolean>;
  currUsername$!: string;
  currisAdmin$!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.currUsername$ = this.authService.currUsername;
    this.currisAdmin$ = this.authService.currAdmin;
  }

  getCurrUsername(): string {
    return this.currUsername$;
  }

  getCurrisAdmin(): boolean{
    return this.currisAdmin$;
  }
  

  onLogout(){
    this.authService.logout();
  }
}
