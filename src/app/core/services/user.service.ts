import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentUser } from 'src/app/shared/models';

import { AuthToken, Credentials } from 'src/app/shared/models';

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }


  attemptAuth(credentials: Credentials) {
    return this.http.get(`${environment.api}/login?username=${credentials.username}&password=${credentials.password}`);
  }

  getNodeHierarchy() {
    return this.http.get('https://dev.greenkoncepts.com/gktest/node-hierarchy?token='+localStorage.getItem('jwtToken'));
  }

  saveCustomerInfo(userdata:any){
    let key = window.localStorage['jwtToken'];
    return this.http.post(`${environment.api}/createCustomer?token=${key}`, userdata);
  }

  getOrderDetails() {
    let key = window.localStorage['jwtToken'];
    return this.http.get(`${environment.api}/getAllOrders?token=${key}`);
  }

  logout(){
    let key = window.localStorage['jwtToken'];
    return this.http.get(`${environment.api}/logout?token=${key}`);
  }

}
