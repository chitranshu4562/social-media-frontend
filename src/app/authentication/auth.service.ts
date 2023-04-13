import { Injectable } from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  id: number;
  email: string;
  auth_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:3000//api/v1/'
  user = new BehaviorSubject(null);
  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: any) {
    return this.http.post<AuthResponseData>(this.API_URL + 'users/user_signup', data)
      .pipe(tap(responseData => {
        this.handleAuthentication(responseData.id, responseData.email, responseData.auth_token);
    }));
  }

  login(data: any) {
    return this.http.post<AuthResponseData>(this.API_URL + 'users/user_login', data)
      .pipe(tap(responseData => {
        this.handleAuthentication(responseData.id, responseData.email, responseData.auth_token);
      }))
  }

  private handleAuthentication(id: number, email: string, authToken: string) {
    const user = new User(id, email, authToken);
    // @ts-ignore
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    // @ts-ignore
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.id, userData.email, userData._token);
    if (loadedUser.token) {
      // @ts-ignore
      this.user.next(loadedUser);
    }
  }
  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

}
