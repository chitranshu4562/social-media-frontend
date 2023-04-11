import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = 'http://localhost:3000/api/v1/'

  constructor(private http: HttpClient) {
  }

  placesDetail() {
    return this.http.get(this.apiUrl + 'places/places_detail')
      .pipe(map((responseData: any) => {
      const result: any = [];
      responseData.data.forEach((res: any) => {
        const obj = {
          cardTitle: res.title,
          cardDescription: res.description,
          imageLink: res.image_link
        }
        result.push(obj);
      })
      return result;
    }));
  }
  createPlace(data: any) {
    return this.http.post(this.apiUrl + 'places/create_favorite_places', data).pipe(map((responseData: any) => {
      const obj = {
        cardTitle: responseData.data.title,
        cardDescription: responseData.data.description,
        imageLink: responseData.data.image_link
      }
      return obj;
    }));
  }
}
