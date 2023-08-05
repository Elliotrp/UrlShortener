import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { IUrl } from 'src/app/interfaces/url.interface';
import { IUrlResponse } from 'src/app/interfaces/url-response.interface';
import { environment } from 'src/environment';
import { LocationService } from '../location/location.service';
import { DeviceService } from '../device/device.service';
import { IGetRequestQuery } from 'src/app/interfaces/get-request-query.interface';
import { IDeviceInfo } from 'src/app/interfaces/device-info.interface';
import { ILocation } from 'src/app/interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
   public url: HttpResponse<IUrlResponse> | null = null;

   constructor(private http: HttpClient,
      private readonly locationService: LocationService,
      private readonly deviceService: DeviceService) { }

   public createUrl(url: IUrl): Observable<HttpResponse<IUrlResponse>> {
      return this.http.post<IUrlResponse>(`${environment.apiUrl}/Url`, url, { observe: 'response' });
   }

   public getUrl(shortKey: string, password?: string): Observable<HttpResponse<IUrlResponse>> {
      return this.getGetRequestQuery(password).pipe(
         switchMap((query) => {
            return this.url?.body?.shortUrl === shortKey ? of(this.url) : this.http.get<IUrlResponse>(`${environment.apiUrl}/Url/${shortKey}`,
            { 
               params: query,
               observe: 'response' 
            }).pipe(
               tap(response => {
                  if (!response?.body?.error) {
                     // cache url in service
                     this.url = response;
                  }
               })
            );
         })
      );
   }

   public setUrlPassword(url: IUrl, password?: string | null): Observable<HttpResponse<IUrlResponse>> {
      return this.http.patch<IUrlResponse>(`${environment.apiUrl}/Url/${url.id}/password`, { password: password }, { observe: 'response' })
   }

   private getGetRequestQuery(password?: string): Observable<any> {
      return this.locationService.getLocation().pipe(
         map((location: ILocation) => {
            const deviceInfo: IDeviceInfo = this.deviceService.getDeviceInfo();
            const query: IGetRequestQuery = {
               ...(password && { password : password }),
               ...location,
               ...deviceInfo,
               dateTime: new Date().toLocaleString()
            };
            return query;
         })
      );
   }
}