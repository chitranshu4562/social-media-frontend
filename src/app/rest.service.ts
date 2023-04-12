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
          id: res.id,
          cardTitle: res.title,
          cardDescription: res.description,
          imageLink: res.image_link,
          userEmail: res.user_email
        }
        result.push(obj);
      })
      return result;
    }));
  }
  createPlace(data: any) {
    return this.http.post(this.apiUrl + 'places/create_favorite_places', data).pipe(map((responseData: any) => {
      const obj = {
        id: responseData.data.id,
        cardTitle: responseData.data.title,
        cardDescription: responseData.data.description,
        imageLink: responseData.data.image_link,
        userEmail: responseData.data.user_email
      }
      return obj;
    }));
  }
  updatePlace(data: any) {
    return this.http.post(this.apiUrl + 'places/edit_place', data);
  }
  deletePlace(id: number) {
    return this.http.get(this.apiUrl + 'places/delete_place?id=' + id);
  }
}
