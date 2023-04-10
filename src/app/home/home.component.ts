import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../authentication/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  userSub: Subscription | undefined;
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;
    })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  onLogout() {
    this.authService.logOut();
  }
}
