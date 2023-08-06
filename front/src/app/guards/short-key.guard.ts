import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UrlService } from '../services/url/url.service';
import { ErrorCode } from '../enums/error-code.enum';
import { DeviceService } from '../services/device/device.service';
import { LocationService } from '../services/location/location.service';
import { ILocation } from '../interfaces/location.interface';
import { IDeviceInfo } from '../interfaces/device-info.interface';
import { IGetUrlRequestQueryParams } from '../interfaces/get-url-request-query-params.interface';
import { switchMap } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class ShortKeyGuard {
   constructor(private readonly urlService: UrlService,
      private readonly locationService: LocationService,
      private readonly deviceService: DeviceService,
      private readonly router: Router) { }

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      const shortKey: string = route.params['shortKey']
      this.locationService.getLocation().pipe(
         switchMap((location: ILocation) => {
            const deviceInfo: IDeviceInfo = this.deviceService.getDeviceInfo();
            const queryParams: IGetUrlRequestQueryParams = {
               ...location,
               ...deviceInfo,
               dateTime: new Date().toLocaleString()
            };
            return this.urlService.getUrl(shortKey, queryParams);
         })
      ).subscribe({
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
