import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";
import {MatDialog} from "@angular/material/dialog";
import {CreatePlaceComponent} from "./create-place/create-place.component";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit{

  myFavouritePlaces: any = []
  constructor(private restService: RestService, private dialog: MatDialog, private messageService: MessageService) {
  }

  ngOnInit() {
    this.getPlacesDetails();
  }

  getPlacesDetails() {
    this.restService.placesDetail().subscribe(response => {
      this.myFavouritePlaces = response
    }, error => {
      this.messageService.displayMessage(error.error.error);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreatePlaceComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.myFavouritePlaces.splice(0, 0, response);
      }
    })
  }

  deletePlace(id: any) {
    const index = this.myFavouritePlaces.findIndex((place: any) => place.id === id);
    this.myFavouritePlaces.splice(index, 1);
  }

  editPlace(editedPlace: any) {
    const index = this.myFavouritePlaces.findIndex((place: any) => place.id === editedPlace.id)
    this.myFavouritePlaces.splice(index, 1, editedPlace);
  }
}
