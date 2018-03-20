import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
    console.log("Auth Service Started");
  }

  attemptAuth(uname: string, pwd: string): Observable<any> {
    const credentials = {username: uname, password: pwd};
    console.log('attempAuth ::');
    return this.http.post<any>('http://localhost:3000/users/login', credentials);
  }
}
