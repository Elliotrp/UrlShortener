import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { IUrlAccessAuthorised } from 'src/app/interfaces/url-access-authorised.interface';
import { environment } from 'src/environment';

@Injectable({
   providedIn: 'root'
})
export class UrlAccessService {

   constructor(private http: HttpClient) { }

   public listUrlAccessAuthorised(urlId: number): Observable<HttpResponse<IListUrlAccessResponse<IUrlAccessAuthorised>>> {
      return this.http.get<IListUrlAccessResponse<IUrlAccessAuthorised>>(`${environment.apiUrl}/Url/${urlId}/UrlAccess/authorised`, { observe: 'response' })
   }
}
