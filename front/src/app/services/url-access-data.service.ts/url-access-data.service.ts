import { Injectable } from '@angular/core';
import { UrlAccessService } from '../url-access/url-access.service';
import { Observable, map } from 'rxjs';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { HttpResponse } from '@angular/common/http';
import { IUrlAccessAuthorised } from 'src/app/interfaces/url-access-authorised.interface';

@Injectable({
   providedIn: 'root'
})
export class UrlAccessDataService {

   constructor(private readonly urlAccessService: UrlAccessService) { }

   public getClickCount(urlId: number): Observable<number> {
      return this.urlAccessService.listUrlAccessAuthorised(urlId).pipe(
         map((response: HttpResponse<IListUrlAccessResponse<IUrlAccessAuthorised>>) => {
            return response.body?.urlAccesses.reduce((sum, current) => sum + current.count, 0) ?? 0;
         })
      )
   }
}
