import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  displayErrorMessage(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000
    });
  }
}
