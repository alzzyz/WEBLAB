import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { HttpClientModule } from '@angular/common/http'; 

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnonymousLayoutComponent } from './anonym.layout.component';
import { AuthenticatedLayoutComponent } from './auth.layout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TechComponent } from './tech/tech.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HistorydialogComponent } from './historydialog/historydialog.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TopNavigationComponent,
    DashboardComponent,
    AnonymousLayoutComponent,
    AuthenticatedLayoutComponent,
    TechComponent,
    HistorydialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
