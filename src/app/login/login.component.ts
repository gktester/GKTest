import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms'
import { AuthenticationService } from '../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any;
  constructor(
              private formBuilder: FormBuilder,
              private  authenticationService : AuthenticationService
    ) {
    this.loginForm =  this.formBuilder.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
   }

   get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

}
