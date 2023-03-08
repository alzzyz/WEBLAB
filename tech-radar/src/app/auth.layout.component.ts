import { Component } from '@angular/core';

@Component({
  selector: 'app-logged-in-layout',
  template: '<app-top-navigation></app-top-navigation><router-outlet></router-outlet>'
})
export class AuthenticatedLayoutComponent  {
}