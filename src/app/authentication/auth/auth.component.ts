import { Component } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {RestService} from "../../rest.service";

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

  constructor(private restService: RestService) {
  }

  submit() {
    this.isLoading = true;
    this.restService.createUser(this.authForm.value).subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, error => {
      console.error(error);
      this.isLoading = false;
    })
    this.authForm.reset();
  }
}
