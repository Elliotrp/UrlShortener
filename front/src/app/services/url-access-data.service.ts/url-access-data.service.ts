import { Injectable } from '@angular/core';
import { UrlAccessService } from '../url-access/url-access.service';
import { Observable, map } from 'rxjs';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { HttpResponse } from '@angular/common/http';
import { IUrlAccessAuthorised } from 'src/app/interfaces/url-access-authorised.interface';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { IUrlAccess } from 'src/app/interfaces/url-access.interface';

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
      );
   }

   public toUrlAccessDataMap<T extends IUrlAccess>(listUrlAccessResponse: IListUrlAccessResponse<T>, getIdFunc: (urlAccess: T) => string, sort?: boolean): UrlAccessDataMap {
      const urlAccessDataMap: UrlAccessDataMap = new UrlAccessDataMap();
      const total = listUrlAccessResponse.urlAccesses.reduce((sum, current) => sum + current.count, 0) / 100;
      let array: T[] = listUrlAccessResponse.urlAccesses;
      if (sort) {
         array = array.sort((a, b) => b.count - a.count);
      }

      array.forEach((urlAccess: T) => {
         urlAccessDataMap.set(getIdFunc(urlAccess), { count: urlAccess.count, relativeCount: urlAccess.count / total })
      });
      return urlAccessDataMap;
   }
}
