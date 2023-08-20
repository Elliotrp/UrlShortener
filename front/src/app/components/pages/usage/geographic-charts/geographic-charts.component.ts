import { Component, OnInit, Type } from '@angular/core';
import { UrlAccessDataMap } from '../../../../classes/url-access-data-map.class';
import { HttpResponse } from '@angular/common/http';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { IUrlAccessCountry } from 'src/app/interfaces/url-access-country.interface';
import { UrlAccessDataService } from 'src/app/services/url-access-data.service.ts/url-access-data.service';
import { UrlAccessService } from 'src/app/services/url-access/url-access.service';
import { IUsageResolverData } from '../usage-resolver-data.interface';
import { IUrl } from 'src/app/interfaces/url.interface';
import { ActivatedRoute } from '@angular/router';
import { byIso } from 'country-code-lookup';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { CountryChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/country-chart-tooltip/country-chart-tooltip.component';
@Component({
  selector: 'app-geographic-charts',
  templateUrl: './geographic-charts.component.html',
  styleUrls: ['./geographic-charts.component.scss']
})
export class GeographicChartsComponent implements OnInit {
   public url: IUrl;
   public choroplethData: UrlAccessDataMap = new UrlAccessDataMap();
   public horizontalBarData: UrlAccessDataMap = new UrlAccessDataMap();
   public countryTooltipType: Type<AbstractChartTooltipComponent> = CountryChartTooltipComponent;

   constructor(
      private readonly urlAccessService: UrlAccessService,
      private readonly urlAccessDataService: UrlAccessDataService,
      activatedRoute: ActivatedRoute
   ) {
      const resolverData: IUsageResolverData = activatedRoute.parent?.snapshot.data['resolverData'];
      this.url = resolverData.url;
   }

   public ngOnInit(): void {
      this.urlAccessService.listUrlAccessCountries(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessCountry>>) => {
         if (response.body) {
            this.choroplethData = this.urlAccessDataService.toUrlAccessDataMap<IUrlAccessCountry>(
               response.body,
               (urlAccessCountry: IUrlAccessCountry) => urlAccessCountry.countryCode,
               false
            );
            this.horizontalBarData = this.urlAccessDataService.toUrlAccessDataMap<IUrlAccessCountry>(
               response.body,
               (urlAccessCountry: IUrlAccessCountry) => byIso(urlAccessCountry.countryCode)?.country ?? urlAccessCountry.countryCode,
               true
            );
         }
      });
   }
}
