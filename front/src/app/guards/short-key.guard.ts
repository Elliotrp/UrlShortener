import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UrlService } from '../services/url/url.service';
import { ErrorCode } from '../enums/error-code.enum';

@Injectable({
   providedIn: 'root'
})
export class ShortKeyGuard implements CanActivate, CanActivateChild {
   constructor(private readonly urlService: UrlService,
      private readonly router: Router) { }

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      const shortKey: string = route.params['shortKey']
      this.urlService.getUrl(shortKey).subscribe({
         next: response => {
            if (response.body && response.body.targetUrl) {
               window.location.href = this.ensureProtocol(response.body.targetUrl);
            } else if (response.body?.error?.errorCode === ErrorCode.InvalidPassword) {
               this.router.navigate([shortKey, 'enter-password']);
            }
            
            return true;
         },
         error: (err) => {
            this.router.navigate([shortKey, 'not-found']);
            throw err;
         }
      });
      return true;
   }

   canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      return this.canActivate(childRoute, state);
   }
   
   private ensureProtocol(url: string): string {
      const httpProtocol = 'http://';
      const httpsProtocol = 'https://';

      if (!url.startsWith(httpProtocol) && !url.startsWith(httpsProtocol)) {
         return `${httpsProtocol}${url}`;
      }

      return url;
   }
}
