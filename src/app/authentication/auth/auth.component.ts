import { Component } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  authForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })
  isLoading = false;
  isLogin = true;
  constructor(private authService: AuthService,
              private router: Router, private messageService: MessageService) {
  }

  submit() {
    this.isLoading = true;
    if (this.isLogin) {
      this.authService.login(this.authForm.value).subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['']);
      }, error => {
        this.isLoading = false;
        this.messageService.displayErrorMessage(error.error.error);
      })
      this.authForm.reset();
    } else {
      this.authService.signUp(this.authForm.value).subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['']);
      }, error => {
        this.isLoading = false;
        this.messageService.displayErrorMessage(error.error.error[0]);
      })
      this.authForm.reset();
    }
  }

  switchMode() {
    this.isLogin = !this.isLogin;
  }
}
