import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { IUrl } from 'src/app/interfaces/url.interface';
import { IUrlResponse } from 'src/app/interfaces/url-response.interface';
import { environment } from 'src/environment';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
   public url: HttpResponse<IUrlResponse> | null = null;
   private deviceInfo: any;

   constructor(private http: HttpClient,
      private deviceService: DeviceDetectorService) { }

   public createUrl(url: IUrl): Observable<HttpResponse<IUrlResponse>> {
      return this.http.post<IUrlResponse>(`${environment.apiUrl}/Url`, url, { observe: 'response' });
   }

   public getUrl(shortKey: string, password?: string): Observable<HttpResponse<IUrlResponse>> {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      console.log(isTablet);  // returns if the device us a tablet (iPad etc)
      console.log(isDesktopDevice); // returns if the app is running 
      return this.url?.body?.shortUrl === shortKey ? of(this.url) : this.http.get<IUrlResponse>(`${environment.apiUrl}/Url/${shortKey}`,
      { 
         params: password ? { password: password} : {},
         observe: 'response' 
      }).pipe(
         tap(response => {
            if (!response?.body?.error) {
               this.url = response;
            }
         })
      );
   }

   public setUrlPassword(url: IUrl, password?: string | null): Observable<HttpResponse<IUrlResponse>> {
      return this.http.patch<IUrlResponse>(`${environment.apiUrl}/Url/${url.id}/password`, { password: password }, { observe: 'response' })
   }
}