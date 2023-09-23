import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { IUrlAccessAuthorised } from 'src/app/interfaces/url-access-authorised.interface';
import { IUrlAccessBrowser } from 'src/app/interfaces/url-access-browser.interface';
import { IUrlAccessDevice } from 'src/app/interfaces/url-access-device.interface';
import { IUrlAccessOperatingSystem } from 'src/app/interfaces/url-access-operating-system.interface';
import { UrlAccessDataService } from 'src/app/services/url-access-data.service.ts/url-access-data.service';
import { UrlAccessService } from 'src/app/services/url-access/url-access.service';
import { IMethodologicalChartsData } from '../interfaces/methodological-charts-data.interface';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';

@Injectable({
   providedIn: 'root'
})
export class MethodologicalChartsService {

   constructor(
      private readonly urlAccessService: UrlAccessService,
      private readonly urlAccessDataService: UrlAccessDataService
   ) { }

   public getMethodologicalChartsData(urlId: number): Observable<IMethodologicalChartsData> {
      return forkJoin([
         this.urlAccessService.listUrlAccessAuthorised(urlId),
         this.urlAccessService.listUrlAccessBrowsers(urlId),
         this.urlAccessService.listUrlAccessDevices(urlId),
         this.urlAccessService.listUrlAccessOperatingSystems(urlId)
      ]).pipe(
         map(([authorisedResponse, browsersResponse, devicesResponse, operatingSystemsResponse]) => {
            const data: IMethodologicalChartsData = {
               authorisedData: new UrlAccessDataMap(),
               browserData: new UrlAccessDataMap(),
               deviceData: new UrlAccessDataMap(),
               operatingSystemData: new UrlAccessDataMap()
            };

            if (authorisedResponse.body) {
               const urlAccessAuthorised: IUrlAccessAuthorised[] = authorisedResponse.body.urlAccesses ?? [];
               data.authorisedData = this.urlAccessDataService.toUrlAccessDataMap(
                  urlAccessAuthorised,
                  (urlAccess: IUrlAccessAuthorised) => urlAccess.authorised ? 'Authorised' : 'Invalid password',
                  false
               );
            }

            if (browsersResponse.body) {
               const urlAccessBrowsers: IUrlAccessBrowser[] = browsersResponse.body.urlAccesses ?? [];
               data.browserData = this.urlAccessDataService.toUrlAccessDataMap(
                  urlAccessBrowsers,
                  (urlAccess: IUrlAccessBrowser) => urlAccess.browser,
                  false
               );
            }

            if (devicesResponse.body) {
               const urlAccessDevices: IUrlAccessDevice[] = devicesResponse.body.urlAccesses ?? [];
               data.deviceData = this.urlAccessDataService.toUrlAccessDataMap(
                  urlAccessDevices,
                  (urlAccess: IUrlAccessDevice) => urlAccess.device,
                  false
               );
            }

            if (operatingSystemsResponse.body) {
               const urlAccessOperatingSystems: IUrlAccessOperatingSystem[] = operatingSystemsResponse.body.urlAccesses ?? [];
               data.operatingSystemData = this.urlAccessDataService.toUrlAccessDataMap(
                  urlAccessOperatingSystems,
                  (urlAccess: IUrlAccessOperatingSystem) => urlAccess.operatingSystem,
                  false
               );
            }

            return data;
         })
      )
   }
}
