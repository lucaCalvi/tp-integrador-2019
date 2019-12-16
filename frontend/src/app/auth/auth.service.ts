import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { JwtResponse } from './jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  URL_API = 'http://localhost:3000/api/auth';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpclient: HttpClient) { }

  login(usuario): Observable<JwtResponse> {
    return this.httpclient.post<JwtResponse>(`${this.URL_API}/login`, usuario).pipe(tap(
      (res: JwtResponse) => {
        if(res) {
          this.saveToken(res.userData.accessToken, res.userData.expiresIn);
        }
      }
    ));
  }

  logout(){
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresIn: string) {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  isLogged() {
    if(!isNullOrUndefined(this.getToken())) {
      return this.token;
    }
    else {
      return null;
    }
  }
}
