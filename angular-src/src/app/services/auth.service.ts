import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActiveUser } from '../models/active-user';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(user) {
    user.username = user.username.toLowerCase();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/users/register', user, { headers });
  }

  login(user) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/users/authenticate', user, { headers });
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', this.authToken);
    return this.http.get(this.baseUrl + '/users/profile', { headers });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    if (this.authToken) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
