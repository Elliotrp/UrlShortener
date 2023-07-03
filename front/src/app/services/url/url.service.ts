import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/models/Url';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(private http: HttpClient) { }

  public createUrl(url: Url): Observable<Url> {
    return this.http.post<Url>(`${environment.apiUrl}/Url`, url);
  }

  public getUrl(shortKey: Url): Observable<Url> {
    return this.http.get<Url>(`${environment.apiUrl}/Url/${shortKey}`);
  }
}