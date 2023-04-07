import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

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
