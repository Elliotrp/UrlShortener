import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/models/Url';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private http: HttpClient) { }

  public createUrl(url: Url): Observable<HttpResponse<Url>> {
    return this.http.post<Url>(`${environment.apiUrl}/Url`, url, { observe: 'response' });
  }

  public getUrl(shortKey: Url): Observable<HttpResponse<Url>> {
    return this.http.get<Url>(`${environment.apiUrl}/Url/${shortKey}`, { observe: 'response' });
  }

  public setUrlPassword(url: Url, password?: string | null): Observable<HttpResponse<Url>> {
    return this.http.patch<Url>(`${environment.apiUrl}/Url/${url.id}/password`, { password: password }, { observe: 'response' })
  }
}