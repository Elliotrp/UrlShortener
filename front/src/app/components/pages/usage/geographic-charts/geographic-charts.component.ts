import { Component, Type } from '@angular/core';
import { UrlAccessDataMap } from '../../../../classes/url-access-data-map.class';
import { ActivatedRoute } from '@angular/router';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { CountryChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/country-chart-tooltip/country-chart-tooltip.component';
import { IGeographicChartsData } from './interfaces/geographic-charts-data.interface';
@Component({
  templateUrl: './geographic-charts.component.html',
  styleUrls: ['./geographic-charts.component.scss']
})
export class GeographicChartsComponent {
   public choroplethData: UrlAccessDataMap = new UrlAccessDataMap();
   public horizontalBarData: UrlAccessDataMap = new UrlAccessDataMap();
   public countryTooltipType: Type<AbstractChartTooltipComponent> = CountryChartTooltipComponent;

   constructor(activatedRoute: ActivatedRoute) {
      const resolverData: IGeographicChartsData = activatedRoute.snapshot.data['resolverData'];
      this.choroplethData = resolverData.choroplethData;
      this.horizontalBarData = resolverData.horizontalBarData;
   }
}
