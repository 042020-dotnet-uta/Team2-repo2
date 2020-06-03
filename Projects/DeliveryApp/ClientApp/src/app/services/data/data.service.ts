import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data;

  constructor() { }

  setData(data: any): Observable<any> {
    this.data = data;
    return of(data);
  }

  getData(): Observable<any> {
    // this.clearData();
    console.log(this.data);
    return of(this.data);
  }

  clearData() {
    this.data = undefined;
  }
}
