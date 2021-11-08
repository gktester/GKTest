import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms'
import {UserService, AuthenticationService,JwtService } from '../core/services';
import { Credentials } from 'src/app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any;
  constructor(
              private formBuilder: FormBuilder,
              private  authenticationService : AuthenticationService,
              private  userService : UserService,
              private jwtService: JwtService
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
    const credentials: Credentials = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password
    }
    this.userService.attemptAuth(credentials).subscribe((res) => {
      if(res) {
       // this.jwtService.saveToken(res.key);
        this.authenticationService.populate();
        this.authenticationService.dashboardRoute();
      }
    }, (err) => {

    });
  }

}
