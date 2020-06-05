import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Address } from '../../models/address';
 
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = "https://deliveryserver.azurewebsites.net/api";
  private address = 'addresses';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*' })
  };
  constructor(private http: HttpClient) { }
  
  getAddresses(): Observable<Address[]> {
    const url = `${this.baseUrl}/${this.address}`;
    let addresses = this.http.get<Address[]>(url);
    return addresses;
  }
}
