import { Component } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {MessageService} from "../../message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl(''),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required)
  })

  isLoading = false;
  constructor(private authService: AuthService, private messageService: MessageService,
              private router: Router) {
  }
  submit() {
    this.isLoading = true;
    this.authService.signUp(this.signUpForm.value).subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['']);
    }, error => {
      this.isLoading = false;
      this.messageService.displayErrorMessage(error.error.error[0]);
    })
    this.signUpForm.reset();
  }


}
