import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MyFavouritePlacesModel} from "../sharedModels/myFavouritePlaces.model";
import {MessageService} from "../../message.service";
import {RestService} from "../../rest.service";
import {MatDialog} from "@angular/material/dialog";
import {CreatePlaceComponent} from "../../places/create-place/create-place.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // @ts-ignore
  @Input() myFavouritePlace: MyFavouritePlacesModel;
  @Output() deletePlace = new EventEmitter();
  constructor(private messageService: MessageService, private restService: RestService, private dialog: MatDialog) {
  }
  comingSoon() {
    this.messageService.displayMessage('This functionality is coming soon...');
  }

  delete(place: any) {
    if (confirm('Are you want to delete ?')) {
      this.restService.deletePlace(place.id).subscribe((response: any) => {
        this.deletePlace.emit(place.id);
        this.messageService.displayMessage(response.message);
      }, error => {
        this.messageService.displayMessage(error.error.error);
      })
    }
  }
  editPlace(place: any) {
    const dialogRef = this.dialog.open(CreatePlaceComponent, {
      data: place
    })
    this.restService.updatePlace(place).subscribe(response => {
      console.log(response);
    })
  }
}
