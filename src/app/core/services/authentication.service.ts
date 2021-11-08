import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { JwtService } from 'src/app/core/services';

import { CurrentUser } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<CurrentUser> = new BehaviorSubject({} as CurrentUser);
  public currentUser: Observable<CurrentUser> = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private location: Location,
    private jwtService: JwtService
  ) { }

  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  populate() {
    if (this.jwtService.getToken()) {
      // decode token for user id
      const decodedToken = this.jwtService.decodeToken();

      let user: CurrentUser = {
        id: decodedToken.uid,
        token: this.jwtService.getToken() as string,
      };
      this.setAuth(user);
    }
    else {
      this.purgeAuth();
    }
  }

  setAuth(user: CurrentUser) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as CurrentUser);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  dashboardRoute() {
    this.router.navigateByUrl('dashboard');
  }

  getUserSubjectValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

}
