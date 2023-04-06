import {Component, Input} from '@angular/core';
import {MyFavouritePlacesModel} from "../sharedModels/myFavouritePlaces.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // @ts-ignore
  @Input() myFavouritePlace: MyFavouritePlacesModel;
}
