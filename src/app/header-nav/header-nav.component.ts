import { UserService } from './../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/shared/models';
import { AuthenticationService } from '../core/services';
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  userName: any;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }
  currentUser?: CurrentUser;
  ngOnInit(): void {
    this.userName =window.localStorage['firstName'];
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.authenticationService.setAuth(this.currentUser)
    });
  }

  logOut(){
    this.userService.logout().subscribe((response: any) => {
      console.log(response);
      this.authenticationService.logoutApp();
    });;
  }
}
