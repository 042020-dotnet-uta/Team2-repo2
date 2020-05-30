import { Injectable } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url = 'https://localhost:5001/WeatherForecast';
  // private url = 'https://jsonplaceholder.typicode.com/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*' })
  };
  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url);
  }
}
