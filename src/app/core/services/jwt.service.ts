import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String, firstName: String) {
    window.localStorage['jwtToken'] = token;
    window.localStorage['firstName'] = firstName;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('firstName');
  }

}
