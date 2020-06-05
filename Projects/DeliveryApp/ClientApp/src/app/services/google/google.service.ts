import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor() { }

  getDistanceMatrix = (service, data) => new Promise((resolve, reject) => {
    service.getDistanceMatrix(data, (response, status) => {
      if(status === 'OK') {
        resolve(response)
      } else {
        reject(response);
      }
    })
  });
  
  getDistance = async (org: string, dest: string ) => {
    const origin = org;
    const final = dest;
    const service = new google.maps.DistanceMatrixService();
    const result = await this.getDistanceMatrix(
      service,
      {
        origins: [origin],
        destinations: [final],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }
    )
    let dist: string = this.getDist(JSON.stringify(result));
    return dist;
  };

  getDist(message: string): string {
    let dist = "";
    let all = message;
    for(let i = 0; i < all.length; i++){
      if(all[i] == "\""){
        let sub = all.substring(i+1,i+5);
        let count = i+8;
        let ds = "";
        if(sub == "text"){
          while(true){
            if(all[count] == "\""){
              break;
            }
            else{
              ds = ds + all[count]
              count++;
            }
          }
          dist = ds;
          break;
        }
      }
    }
    return dist;
  }
}
