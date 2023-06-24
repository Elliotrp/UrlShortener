import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from 'src/app/models/Url';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  public createUrl(url: Url): Observable<Url> {
    return this.http.post<Url>(`${this.apiUrl}/Url`, url);
  }

  public getUrl(shortKey: Url): Observable<Url> {
    return this.http.get<Url>(`${this.apiUrl}/Url/${shortKey}`);
  }
}