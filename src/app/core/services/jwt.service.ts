import { Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';

import { DecodedAuthToken } from 'src/app/shared/models';
@Injectable({ 
  providedIn: "root" 
})
export class JwtService {  

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('role');
  }

  decodeToken(): DecodedAuthToken {
    const decoded: DecodedAuthToken = jwt_decode(window.localStorage['jwtToken']);
    return decoded;
  }

}