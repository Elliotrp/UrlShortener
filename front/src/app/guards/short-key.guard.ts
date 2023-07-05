import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UrlService } from '../services/url/url.service';

@Injectable({
  providedIn: 'root'
})
export class ShortKeyGuard implements CanActivate, CanActivateChild {
  constructor(private readonly urlService: UrlService,
    private readonly router: Router) {
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
      return this.urlService.getUrl(route.params['shortKey']).pipe(
        map(response => {
          if (response.ok && response.body && response.body.targetUrl) {
            window.location.href = this.ensureProtocol(response.body.targetUrl);
          } else {
            this.router.navigate(['..']);
          }

          return true;
        })
      );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
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
