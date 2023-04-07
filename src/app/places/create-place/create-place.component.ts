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


  newPlace = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl(''),
    imageLink: new UntypedFormControl('', Validators.required)
  })

  constructor(private restService: RestService, private dialogRef: MatDialogRef<CreatePlaceComponent>) {
  }
  ngOnInit() {
  }
  createNewPlace() {
    this.restService.createPlace(this.newPlace.value).subscribe((response: any) => {
      console.log(response);
      this.newPlace.reset();
      this.dialogRef.close(response);
    }, error => {
      console.error(error);
    })
  }
}
