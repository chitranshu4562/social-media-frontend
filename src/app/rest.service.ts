import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = 'http://localhost:3000//api/v1/places/'

  constructor(private http: HttpClient) {
  }

  placesDetail() {
    return this.http.get(this.apiUrl + 'places_details').pipe(map((responseData: any) => {
      const result: any = [];
      responseData.data.forEach((res: any) => {
        const obj = {
          cardTitle: res.title,
          cardDescription: res.description,
          imageLink: res.imageLink
        }
        result.push(obj);
      })
      return result;
    }));
  }
}
