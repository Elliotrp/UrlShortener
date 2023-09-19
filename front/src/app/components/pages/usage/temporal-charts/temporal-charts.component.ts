import { Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { GenericClicksTooltipComponent } from 'src/app/components/shared/chart-tooltip/generic-clicks-tooltip/generic-clicks-tooltip.component';
import { ITemporalChartsData } from './interfaces/temporal-charts-data.interface';

@Component({
   templateUrl: './temporal-charts.component.html',
   styleUrls: ['./temporal-charts.component.scss']
})
export class TemporalChartsComponent {
   public genericClicksTooltipType: Type<AbstractChartTooltipComponent> = GenericClicksTooltipComponent;
   public daysOfWeekData: UrlAccessDataMap = new UrlAccessDataMap();
   public lastThirtyDaysData: UrlAccessDataMap = new UrlAccessDataMap();
   public lastTwelveMonthsData: UrlAccessDataMap = new UrlAccessDataMap();
   public hoursOfDayData: UrlAccessDataMap = new UrlAccessDataMap()

   constructor(activatedRoute: ActivatedRoute) {
      const resolverData: ITemporalChartsData = activatedRoute.snapshot.data['resolverData'];
      this.daysOfWeekData = resolverData.daysOfWeekData;
      this.lastThirtyDaysData = resolverData.lastThirtyDaysData;
      this.lastTwelveMonthsData = resolverData.lastTwelveMonthsData;
      this.hoursOfDayData = resolverData.hoursOfDayData;
   }
}
