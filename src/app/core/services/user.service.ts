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

  getUserDetails(): Observable<CurrentUser> {
    return this.http.get(`${environment.api}/user`).pipe(map(user => user as CurrentUser));
  }

  attemptAuth(credentials: Credentials) {
    console.log(credentials);
    return this.http.get(`${environment.api}/login?username=${credentials.username}&password=${credentials.password}`);
  }

}
