import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';
import {AuthenticatedLayoutComponent } from './auth.layout.component';
import {AnonymousLayoutComponent } from './anonym.layout.component';
import {TechComponent } from './tech/tech.component';



const routes: Routes = [
  { path: '', component: AuthenticatedLayoutComponent, canActivate: [AuthGuard], children:[
    { path: 'tech', component: TechComponent},
    { path: 'tech/:id', component: TechComponent},
    { path: '', component:DashboardComponent}
    //{ path: '**', component: PageNotFoundComponent}
  ]},
  { path: '', component: AnonymousLayoutComponent, children: [
      { path: 'login', component: LoginPageComponent},    
  ]}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
