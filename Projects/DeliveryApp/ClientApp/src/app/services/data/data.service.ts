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
    let temp = this.data;
    // this.clearData();
    return of(temp);
  }

  clearData() {
    this.data = undefined;
  }
}
