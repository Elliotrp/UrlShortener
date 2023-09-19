import { Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { GenericClicksTooltipComponent } from 'src/app/components/shared/chart-tooltip/generic-clicks-tooltip/generic-clicks-tooltip.component';
import { IMethodologicalChartsData } from './interfaces/methodological-charts-data.interface';

@Component({
   templateUrl: './methodological-charts.component.html',
   styleUrls: ['./methodological-charts.component.scss']
})
export class MethodologicalChartsComponent {
   public genericClicksTooltipType: Type<AbstractChartTooltipComponent> = GenericClicksTooltipComponent;
   public authorisedData: UrlAccessDataMap = new UrlAccessDataMap();
   public browserData: UrlAccessDataMap = new UrlAccessDataMap();
   public deviceData: UrlAccessDataMap = new UrlAccessDataMap();
   public operatingSystemData: UrlAccessDataMap = new UrlAccessDataMap();
   
   constructor(
      activatedRoute: ActivatedRoute
   ) {
      const resolverData: IMethodologicalChartsData = activatedRoute.snapshot.data['resolverData'];
      this.authorisedData = resolverData.authorisedData;
      this.browserData = resolverData.browserData;
      this.deviceData = resolverData.deviceData;
      this.operatingSystemData = resolverData.operatingSystemData;
   }
}
