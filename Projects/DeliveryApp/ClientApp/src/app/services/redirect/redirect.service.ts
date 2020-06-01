import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  search: string;

  constructor() { }

  restaurantNameSearch(search: string): Observable<string> {
    this.search = search;
    return of(search);
  }
}
