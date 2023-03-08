import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';


export class emailErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null) : boolean{
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  passwordHideToggler = true;
  matcher = new emailErrorStateMatcher();
  
   constructor(private fb: FormBuilder, private authService: AuthService, private _snackBar: SnackbarService){}

  ngOnInit(): void {
    this.form = this.fb.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required])
    });
  }


  sendLogin(){
    if(this.form.valid){
      this.authService.login(this.form.value)
      this.authService.isLoggedIn.subscribe(_loggedIn => {
        if(_loggedIn){
          this._snackBar.success("Login Successful");
        } else {
          this._snackBar.error("Login failed");
        }
      })
    }
    
  }

  get email() : any{
      return this.form.get('email');
  }

  


}
