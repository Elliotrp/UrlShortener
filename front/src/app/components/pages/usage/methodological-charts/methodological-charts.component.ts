import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { GenericClicksTooltipComponent } from 'src/app/components/shared/chart-tooltip/generic-clicks-tooltip/generic-clicks-tooltip.component';
import { IUrl } from 'src/app/interfaces/url.interface';
import { UrlAccessService } from 'src/app/services/url-access/url-access.service';
import { IUsageResolverData } from '../usage-resolver-data.interface';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { IUrlAccessAuthorised } from 'src/app/interfaces/url-access-authorised.interface';
import { UrlAccessDataService } from 'src/app/services/url-access-data.service.ts/url-access-data.service';
import { HttpResponse } from '@angular/common/http';
import { IUrlAccessBrowser } from 'src/app/interfaces/url-access-browser.interface';
import { IUrlAccessDevice } from 'src/app/interfaces/url-access-device.interface';
import { IUrlAccessOperatingSystem } from 'src/app/interfaces/url-access-operating-system.interface';

@Component({
   templateUrl: './methodological-charts.component.html',
   styleUrls: ['./methodological-charts.component.scss']
})
export class MethodologicalChartsComponent implements OnInit {
   public url: IUrl;
   public genericClicksTooltipType: Type<AbstractChartTooltipComponent> = GenericClicksTooltipComponent;
   public authorisedData: UrlAccessDataMap = new UrlAccessDataMap();
   public browserData: UrlAccessDataMap = new UrlAccessDataMap();
   public deviceData: UrlAccessDataMap = new UrlAccessDataMap();
   public operatingSystemData: UrlAccessDataMap = new UrlAccessDataMap();
   
   constructor(
      private readonly urlAccessService: UrlAccessService,
      private readonly urlAccessDataService: UrlAccessDataService,
      activatedRoute: ActivatedRoute
   ) {
      const resolverData: IUsageResolverData = activatedRoute.parent?.snapshot.data['resolverData'];
      this.url = resolverData.url;
   }

   public ngOnInit(): void {
      this.getUrlAccessAuthorised();
      this.getUrlAccessBrowsers();
      this.getUrlAccessDevices();
      this.getUrlAccessOperatingSystems();
   }

   private getUrlAccessAuthorised(): void {
      this.urlAccessService.listUrlAccessAuthorised(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessAuthorised>>) => {
         if (response.body) {
            var urlAccessAuthorised: IUrlAccessAuthorised[] = response.body.urlAccesses ?? [];

            this.authorisedData = this.urlAccessDataService.toUrlAccessDataMap(
               urlAccessAuthorised,
               (urlAccess: IUrlAccessAuthorised) => urlAccess.authorised ? 'Authorised' : 'Unauthorised',
               false
            );
         }
      })
   }

   private getUrlAccessBrowsers(): void {
      this.urlAccessService.listUrlAccessBrowsers(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessBrowser>>) => {
         if (response.body) {
            var urlAccessBrowsers: IUrlAccessBrowser[] = response.body.urlAccesses ?? [];

            this.browserData = this.urlAccessDataService.toUrlAccessDataMap(
               urlAccessBrowsers,
               (urlAccess: IUrlAccessBrowser) => urlAccess.browser,
               false
            );
         }
      })
   }

   private getUrlAccessDevices(): void {
      this.urlAccessService.listUrlAccessDevices(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessDevice>>) => {
         if (response.body) {
            var urlAccessDevices: IUrlAccessDevice[] = response.body.urlAccesses ?? [];

            this.deviceData = this.urlAccessDataService.toUrlAccessDataMap(
               urlAccessDevices,
               (urlAccess: IUrlAccessDevice) => urlAccess.device,
               false
            );
         }
      })
   }

   private getUrlAccessOperatingSystems(): void {
      this.urlAccessService.listUrlAccessOperatingSystems(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessOperatingSystem>>) => {
         if (response.body) {
            var urlAccessOperatingSystems: IUrlAccessOperatingSystem[] = response.body.urlAccesses ?? [];

            this.operatingSystemData = this.urlAccessDataService.toUrlAccessDataMap(
               urlAccessOperatingSystems,
               (urlAccess: IUrlAccessOperatingSystem) => urlAccess.operatingSystem,
               false
            );
         }
      })
   }
}
