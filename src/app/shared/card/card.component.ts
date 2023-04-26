import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyFavouritePlacesModel} from "../sharedModels/myFavouritePlaces.model";
import {MessageService} from "../../message.service";
import {RestService} from "../../rest.service";
import {MatDialog} from "@angular/material/dialog";
import {CreatePlaceComponent} from "../../places/create-place/create-place.component";
import {AuthService} from "../../authentication/auth.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  // @ts-ignore
  @Input() myFavouritePlace: MyFavouritePlacesModel;
  @Output() deletePlace = new EventEmitter();
  @Output() editPlace = new EventEmitter();
  permissionFlag = false;
  constructor(private messageService: MessageService, private restService: RestService,
              private dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
        this.authService.user.subscribe((user: any) => {
          if (user) {
            if (user.email === this.myFavouritePlace.userEmail) {
              this.permissionFlag = true;
            }
          }
        })
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
  edit(place: any) {
    const dialogRef = this.dialog.open(CreatePlaceComponent, {
      data: place
    })
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.editPlace.emit(response);
      }
    })
  }
}
