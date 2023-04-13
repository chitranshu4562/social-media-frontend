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

  logInForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })
  isLoading = false;
  constructor(private authService: AuthService,
              private router: Router, private messageService: MessageService) {
  }

  submit() {
    this.isLoading = true;
    this.authService.login(this.logInForm.value).subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['']);
    }, error => {
      this.isLoading = false;
      this.messageService.displayErrorMessage(error.error.error);
    })
    this.logInForm.reset();
  }
}
