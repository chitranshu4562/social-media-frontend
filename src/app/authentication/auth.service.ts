import {Injectable} from '@angular/core';
import {BehaviorSubject, map, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  id: number;
  email: string;
  auth_token: string;
  expires_in: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'http://localhost:3000//api/v1/'
  user = new BehaviorSubject(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(data: any) {
    return this.http.post<AuthResponseData>(this.API_URL + 'users/user_signup', data)
      .pipe(tap(responseData => {
        this.handleAuthentication(responseData.id, responseData.email, responseData.auth_token, responseData.expires_in);
      }));
  }

  login(data: any) {
    return this.http.post<AuthResponseData>(this.API_URL + 'users/user_login', data)
      .pipe(tap(responseData => {
        this.handleAuthentication(responseData.id, responseData.email, responseData.auth_token, responseData.expires_in);
      }))
  }

  private handleAuthentication(id: number, email: string, authToken: string, expiresIn: number) {
    const tokenExpirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(id, email, authToken, tokenExpirationDate);
    // @ts-ignore
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    // @ts-ignore
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.id, userData.email, userData._token, userData._tokenExpirationDate);
    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      // @ts-ignore
      this.user.next(loadedUser);
    }
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/login']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration)
  }

}
