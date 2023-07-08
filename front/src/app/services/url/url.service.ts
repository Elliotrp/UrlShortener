import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { IUrl } from 'src/app/interfaces/url.interface';
import { IUrlResponse } from 'src/app/interfaces/url-response.interface';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
   public url: HttpResponse<IUrlResponse> | null = null;

   constructor(private http: HttpClient) { }

   public createUrl(url: IUrl): Observable<HttpResponse<IUrlResponse>> {
      return this.http.post<IUrlResponse>(`${environment.apiUrl}/Url`, url, { observe: 'response' });
   }

   public getUrl(shortKey: string, password?: string): Observable<HttpResponse<IUrlResponse>> {
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