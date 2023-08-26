import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { IUrlAccessAuthorised } from 'src/app/interfaces/url-access-authorised.interface';
import { IUrlAccessCountry } from 'src/app/interfaces/url-access-country.interface';
import { IUrlAccessDay } from 'src/app/interfaces/url-access-day.interface';
import { environment } from 'src/environment';

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
}
