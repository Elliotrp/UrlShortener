import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { IUrlAccessAuthorised } from 'src/app/interfaces/url-access-authorised.interface';
import { IUrlAccessBrowser } from 'src/app/interfaces/url-access-browser.interface';
import { IUrlAccessCountry } from 'src/app/interfaces/url-access-country.interface';
import { IUrlAccessDate } from 'src/app/interfaces/url-access-date.interface';
import { IUrlAccessDay } from 'src/app/interfaces/url-access-day.interface';
import { IUrlAccessDevice } from 'src/app/interfaces/url-access-device.interface';
import { IUrlAccessHour } from 'src/app/interfaces/url-access-hour.interface';
import { IUrlAccessOperatingSystem } from 'src/app/interfaces/url-access-operating-system.interface';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})
export class UrlAccessService {

   constructor(private http: HttpClient) { }

   public listUrlAccessAuthorised(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessAuthorised>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessAuthorised>>(
         `${environment.apiUrl}/Url/${urlId}/UrlAccess/authorised`,
         { observe: 'response' });
   }

   public listUrlAccessCountries(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessCountry>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessCountry>>(
         `${environment.apiUrl}/Url/${urlId}/UrlAccess/country`,
         { observe: 'response' });
   }

   public listUrlAccessDays(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessDay>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessDay>>(
         `${environment.apiUrl}/Url/${urlId}/UrlAccess/day`,
         { observe: 'response' });
   }

   public listUrlAccessDates(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessDate>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessDate>>(
         `${environment.apiUrl}/Url/${urlId}/UrlAccess/date`,
         { observe: 'response' });
   }

   public listUrlAccessHours(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessHour>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessHour>>(
         `${environment.apiUrl}/Url/${urlId}/UrlAccess/hour`,
         { observe: 'response' });
   }

   public listUrlAccessBrowsers(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessBrowser>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessBrowser>>(
         `${environment.apiUrl}/Url/${urlId}/UrlAccess/browser`,
         { observe: 'response' });
   }

   public listUrlAccessDevices(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessDevice>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessDevice>>(
         `${environment.apiUrl}/Url/${urlId}/UrlAccess/device`,
         { observe: 'response' });
   }

   public listUrlAccessOperatingSystems(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessOperatingSystem>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessOperatingSystem>>(
         `${environment.apiUrl}/Url/${urlId}/UrlAccess/operatingSystem`,
         { observe: 'response' });
   }
}
