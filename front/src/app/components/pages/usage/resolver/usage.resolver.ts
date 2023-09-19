import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { IUsageResolverData } from '../usage-resolver-data.interface';
import { UrlLocalStorageService } from 'src/app/services/url-local-storage/url-local-storage.service';
import { inject } from '@angular/core';
import { UrlAccessDataService } from 'src/app/services/url-access-data.service.ts/url-access-data.service';
import { EMPTY, catchError, map } from 'rxjs';

export const usageResolver: ResolveFn<IUsageResolverData | undefined> = (
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
) => {
   const shortKey: string = route.params['shortKey']
   const url = inject(UrlLocalStorageService).getUrl(shortKey);
   if (url) {
      return inject(UrlAccessDataService).getClickCount(url.id)
         .pipe(
            map((response: number) => {
               return {
                  url: url,
                  accessCount: response
               };
            }),
            catchError(() => {
               inject(Router).navigate(['']);
               return EMPTY;
            })
         )
   } else {
      inject(Router).navigate(['']);
      return EMPTY;
   }
};
