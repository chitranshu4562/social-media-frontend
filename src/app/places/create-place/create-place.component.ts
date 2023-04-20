import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {RestService} from "../../rest.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../message.service";

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit{


  newPlaceForm = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl(''),
    imageLink: new UntypedFormControl('', Validators.required),
    placeTag: new UntypedFormControl('public', Validators.required)
  })
  editFlag = false;

  constructor(private restService: RestService, private dialogRef: MatDialogRef<CreatePlaceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private messageService: MessageService) {
  }
  ngOnInit() {
    if (this.data) {
      this.editFlag = true;
      this.newPlaceForm.get('title')?.setValue(this.data.cardTitle);
      this.newPlaceForm.get('description')?.setValue(this.data.cardDescription);
      this.newPlaceForm.get('imageLink')?.setValue(this.data.imageLink);
      this.newPlaceForm.get('placeTag')?.setValue(this.data.placeTag);
    }
  }
  createNewPlace() {
    this.restService.createPlace(this.newPlaceForm.value).subscribe((response: any) => {
      this.newPlaceForm.reset();
      this.dialogRef.close(response);
    }, error => {
      this.messageService.displayErrorMessage(error.error.message);
    })
  }
  updatePlace() {
    const updatedDetails = { id: this.data.id, ...this.newPlaceForm.value }
    this.restService.updatePlace(updatedDetails).subscribe(response => {
      this.dialogRef.close(response);
    }, error => {
      this.messageService.displayErrorMessage(error.error.message);
    })
  }

  submit() {
    if (this.editFlag) {
      this.updatePlace();
    } else {
      this.createNewPlace();
    }
  }
}
