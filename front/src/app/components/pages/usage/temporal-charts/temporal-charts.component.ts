import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { AbstractChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/abstract-chart-tooltip.component';
import { IUrl } from 'src/app/interfaces/url.interface';
import { UrlAccessDataService } from 'src/app/services/url-access-data.service.ts/url-access-data.service';
import { UrlAccessService } from 'src/app/services/url-access/url-access.service';
import { IUsageResolverData } from '../usage-resolver-data.interface';
import { HttpResponse } from '@angular/common/http';
import { IListUrlAccessResponse } from 'src/app/interfaces/list-url-access-response.interface';
import { IUrlAccessDay } from 'src/app/interfaces/url-access-day.interface';
import { DayOfWeek, DayOfWeekName, DayOfWeekOrder } from 'src/app/enums/day-of-week.enum';
import { DayChartTooltipComponent } from 'src/app/components/shared/chart-tooltip/day-chart-tooltip/day-chart-tooltip.component';

@Component({
   selector: 'app-temporal-charts',
   templateUrl: './temporal-charts.component.html',
   styleUrls: ['./temporal-charts.component.scss']
})
export class TemporalChartsComponent implements OnInit {
   public url: IUrl;
   public horizontalBarData: UrlAccessDataMap = new UrlAccessDataMap();
   public dayTooltipType: Type<AbstractChartTooltipComponent> = DayChartTooltipComponent;

   constructor(
      private readonly urlAccessService: UrlAccessService,
      private readonly urlAccessDataService: UrlAccessDataService,
      activatedRoute: ActivatedRoute
   ) {
      const resolverData: IUsageResolverData = activatedRoute.parent?.snapshot.data['resolverData'];
      this.url = resolverData.url;
   }

   public ngOnInit(): void {
      this.urlAccessService.listUrlAccessDays(this.url.id).subscribe((response: HttpResponse<IListUrlAccessResponse<IUrlAccessDay>>) => {
         if (response.body) {
            const urlAccesses: IUrlAccessDay[] = response.body.urlAccesses ?? [];

            const fullList: IUrlAccessDay[] = Array<IUrlAccessDay>(7);
            for (let dayOfWeek: DayOfWeek = DayOfWeek.Sunday; dayOfWeek <= DayOfWeek.Saturday; dayOfWeek++) {
               fullList[DayOfWeekOrder[dayOfWeek]] = this.getUrlAccessDay(urlAccesses, dayOfWeek);
            }

            this.horizontalBarData = this.urlAccessDataService.toUrlAccessDataMap(
               fullList,
               (urlAccess: IUrlAccessDay) => DayOfWeekName[urlAccess.day],
               false);
         }
      });
   }

   private getUrlAccessDay(urlAccessDays: IUrlAccessDay[], dayOfWeek: DayOfWeek): IUrlAccessDay {
      return urlAccessDays.find(value => value.day === dayOfWeek) ?? 
      {
         urlId: this.url.id,
         day: dayOfWeek,
         count: 0
      };
   }
}
