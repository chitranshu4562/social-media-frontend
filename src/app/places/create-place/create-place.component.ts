import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {RestService} from "../../rest.service";
import {MatDialogRef} from "@angular/material/dialog";

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
    place_tag: new UntypedFormControl('public', Validators.required)
  })

  constructor(private restService: RestService, private dialogRef: MatDialogRef<CreatePlaceComponent>) {
  }
  ngOnInit() {
  }
  createNewPlace() {
    this.restService.createPlace(this.newPlaceForm.value).subscribe((response: any) => {
      this.newPlaceForm.reset();
      this.dialogRef.close(response);
    }, error => {
      console.error(error);
    })
  }
}
