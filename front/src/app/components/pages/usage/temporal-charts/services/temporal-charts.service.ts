import { Injectable } from '@angular/core';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { DayOfWeek, DayOfWeekOrder, DayOfWeekName } from 'src/app/enums/day-of-week.enum';
import { IUrlAccessDate } from 'src/app/interfaces/url-access-date.interface';
import { IUrlAccessDay } from 'src/app/interfaces/url-access-day.interface';
import { IUrl } from 'src/app/interfaces/url.interface';
import { UrlAccessDataService } from 'src/app/services/url-access-data.service.ts/url-access-data.service';

@Injectable({
   providedIn: 'root'
})
export class TemporalChartsService {

   constructor(
      private readonly urlAccessDataService: UrlAccessDataService
   ) { }

   public convertDateStringToDate(urlAccessDates: IUrlAccessDate[]): IUrlAccessDate[] {
      return urlAccessDates.map((urlAccessDate: IUrlAccessDate): IUrlAccessDate => {
         return {
            date: new Date(urlAccessDate.date),
            urlId: urlAccessDate.urlId,
            id: urlAccessDate.id,
            count: urlAccessDate.count
         }});
   }

   public getDaysOfWeekDataMap(urlAccesses: IUrlAccessDay[], url: IUrl): UrlAccessDataMap {
      const daysOfWeek: IUrlAccessDay[] = Array<IUrlAccessDay>(7);
      for (let dayOfWeek: DayOfWeek = DayOfWeek.Sunday; dayOfWeek <= DayOfWeek.Saturday; dayOfWeek++) {
         daysOfWeek[DayOfWeekOrder[dayOfWeek]] = this.getUrlAccessDay(urlAccesses, dayOfWeek, url);
      }

      return this.urlAccessDataService.toUrlAccessDataMap(
         daysOfWeek,
         (urlAccess: IUrlAccessDay) => DayOfWeekName[urlAccess.day],
         false);
   }

   public getLastThirtyDaysDataMap(urlAccessDates: IUrlAccessDate[], url: IUrl): UrlAccessDataMap {
      const lastThirtyDays: IUrlAccessDate[] = Array<IUrlAccessDate>(30);
      const date: Date = new Date();
      for (let day: number = 29; day >= 0; day--) {
         lastThirtyDays[day] = this.getUrlAccessDate(urlAccessDates, date, url);
         date.setDate(date.getDate() - 1);
      }

      return this.urlAccessDataService.toUrlAccessDataMap(
         lastThirtyDays,
         (urlAccess: IUrlAccessDate): string => urlAccess.date.toLocaleDateString(),
         false);
   }

   public getLastTwelveMonthsDataMap(urlAccessDates: IUrlAccessDate[], url: IUrl): UrlAccessDataMap {
      const date: Date = new Date()
      date.setDate(1);
      const lastTwleveMonths: IUrlAccessDate[] = new Array<IUrlAccessDate>(12);
      for (let month: number = 11; month >= 0; month--) {
         lastTwleveMonths[month] = this.getUrlAccessMonth(urlAccessDates, date, url);
         date.setMonth(date.getMonth() - 1);
      };

      return this.urlAccessDataService.toUrlAccessDataMap(
         lastTwleveMonths,
         (urlAccess: IUrlAccessDate): string => urlAccess.date.toLocaleString('default', { month: 'long' }),
         false);
   }

   private getUrlAccessDay(urlAccessDays: IUrlAccessDay[], dayOfWeek: DayOfWeek, url: IUrl): IUrlAccessDay {
      return urlAccessDays.find(value => value.day === dayOfWeek) ??
      {
         urlId: url.id,
         day: dayOfWeek,
         count: 0
      };
   }

   private getUrlAccessDate(urlAccessDates: IUrlAccessDate[], date: Date, url: IUrl): IUrlAccessDate {
      return urlAccessDates.find((urlAccess: IUrlAccessDate) =>
         urlAccess.date.toLocaleDateString() === date.toLocaleDateString()) ??
      {
         urlId: url.id,
         date: new Date(date),
         count: 0
      };
   }

   private getUrlAccessMonth(urlAccessDates: IUrlAccessDate[], date: Date, url: IUrl): IUrlAccessDate {
      const accessesThisMonth: IUrlAccessDate[] = urlAccessDates.filter((d) =>
         d.date.getMonth() === date.getMonth());

      return { 
         urlId: url.id,
         date: new Date(date),
         count: accessesThisMonth.reduce((acc, i) => acc = acc + i.count, 0)
      };
   }
}
