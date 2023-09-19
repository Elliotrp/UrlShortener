import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { byIso } from 'country-code-lookup';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { IUrlAccessCountry } from 'src/app/interfaces/url-access-country.interface';
import { UrlAccessDataService } from 'src/app/services/url-access-data.service.ts/url-access-data.service';
import { UrlAccessService } from 'src/app/services/url-access/url-access.service';
import { IGeographicChartsData } from '../interfaces/geographic-charts-data.interface';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { Observable, map } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class GeographicChartsService {

   constructor(
      private readonly urlAccessService: UrlAccessService,
      private readonly urlAccessDataService: UrlAccessDataService
   ) { }

   public getGeographicChartsData(urlId: number): Observable<IGeographicChartsData> {
      return this.urlAccessService.listUrlAccessCountries(urlId).pipe(
         map((response: HttpResponse<IListUrlAccessResponse<IUrlAccessCountry>>) => {
            const data: IGeographicChartsData = {
               choroplethData: new UrlAccessDataMap(),
               horizontalBarData: new UrlAccessDataMap()
            };

            if (response.body) {
               data.choroplethData = this.urlAccessDataService.toUrlAccessDataMap<IUrlAccessCountry>(
                  response.body.urlAccesses,
                  (urlAccessCountry: IUrlAccessCountry) => urlAccessCountry.countryCode,
                  false);
               data.horizontalBarData = this.urlAccessDataService.toUrlAccessDataMap<IUrlAccessCountry>(
                  response.body.urlAccesses,
                  (urlAccessCountry: IUrlAccessCountry) => byIso(urlAccessCountry.countryCode)?.country ?? urlAccessCountry.countryCode,
                  true);
            }

            return data;
         }));
   }
}
