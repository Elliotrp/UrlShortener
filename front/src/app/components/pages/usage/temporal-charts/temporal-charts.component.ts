import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { IUrl } from 'src/app/interfaces/url.interface';
import { UrlAccessService } from 'src/app/services/url-access/url-access.service';
import { IUsageResolverData } from '../usage-resolver-data.interface';
import { HttpResponse } from '@angular/common/http';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { IUrlAccessDay } from 'src/app/interfaces/url-access-day.interface';
import { GenericClicksTooltipComponent } from 'src/app/components/shared/chart-tooltip/generic-clicks-tooltip/generic-clicks-tooltip.component';
import { IUrlAccessDate } from 'src/app/interfaces/url-access-date.interface';
import { TemporalChartsService } from './services/temporal-charts.service';
import { IUrlAccessHour } from 'src/app/interfaces/url-access-hour.interface';

@Component({
   templateUrl: './temporal-charts.component.html',
   styleUrls: ['./temporal-charts.component.scss']
})
export class TemporalChartsComponent implements OnInit {
   public url: IUrl;
   public genericClicksTooltipType: Type<AbstractChartTooltipComponent> = GenericClicksTooltipComponent;
   public daysOfWeekData: UrlAccessDataMap = new UrlAccessDataMap();
   public lastThirtyDaysData: UrlAccessDataMap = new UrlAccessDataMap();
   public lastTwelveMonthsData: UrlAccessDataMap = new UrlAccessDataMap();
   public hoursOfDayData: UrlAccessDataMap = new UrlAccessDataMap()

   constructor(
      private readonly urlAccessService: UrlAccessService,
      private readonly service: TemporalChartsService,
      activatedRoute: ActivatedRoute
   ) {
      const resolverData: IUsageResolverData = activatedRoute.parent?.snapshot.data['resolverData'];
      this.url = resolverData.url;
   }

   public ngOnInit(): void {
      this.getUrlAccessDays();
      this.getUrlAccessDates();
      this.getUrlAccessHours();
   }

   private getUrlAccessDates(): void {
      this.urlAccessService.listUrlAccessDates(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessDate>>) => {
         if (response.body) {
            var urlAccessDates: IUrlAccessDate[] = response.body.urlAccesses ?? [];
            urlAccessDates = this.service.convertDateStringToDate(urlAccessDates);
            this.lastThirtyDaysData = this.service.getLastThirtyDaysDataMap(urlAccessDates, this.url);
            this.lastTwelveMonthsData = this.service.getLastTwelveMonthsDataMap(urlAccessDates, this.url);
         }
      });
   }

   private getUrlAccessDays(): void {
      this.urlAccessService.listUrlAccessDays(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessDay>>) => {
         if (response.body) {
            const urlAccesses: IUrlAccessDay[] = response.body.urlAccesses ?? [];
            this.daysOfWeekData = this.service.getDaysOfWeekDataMap(urlAccesses, this.url);
         }
      });
   }

   private getUrlAccessHours(): void {
      this.urlAccessService.listUrlAccessHours(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessHour>>) => {
         if (response.body) {
            const urlAccesses: IUrlAccessHour[] = response.body.urlAccesses ?? [];
            this.hoursOfDayData = this.service.getHoursOfTheDayDataMap(urlAccesses, this.url);
         }
      })
   }
}
