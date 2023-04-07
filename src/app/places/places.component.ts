import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit{

  myFavouritePlaces: any = []
  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.getPlacesDetails();
  }

  getPlacesDetails() {
    this.restService.placesDetail().subscribe(response => {
      this.myFavouritePlaces = response
    });
  }

}
