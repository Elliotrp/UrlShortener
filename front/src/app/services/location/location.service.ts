import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { ILocation } from 'src/app/interfaces/location.interface';

@Injectable({
   providedIn: 'root',
})
export class LocationService {
   private apiUrl = 'https://ipapi.co/json/';
   public location: ILocation | undefined;

   constructor(private http: HttpClient) {}

   public getLocation(): Observable<ILocation> {
      return this.location ? of(this.location) : this.http.get<any>(this.apiUrl).pipe(
         map((locationData) => {
            this.location = {
               latitude: locationData.latitude,
               longitude: locationData.longitude,
               country: locationData.country_name
            }; 
            return this.location;
         })
      );
   }
}
