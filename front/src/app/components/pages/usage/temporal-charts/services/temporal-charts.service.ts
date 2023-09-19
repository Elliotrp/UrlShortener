import { Injectable } from '@angular/core';
import { UrlAccessDataMap } from 'src/app/classes/url-access-data-map.class';
import { DayOfWeek, DayOfWeekOrder, DayOfWeekName } from 'src/app/enums/day-of-week.enum';
import { getTimeStringFromHour } from 'src/app/functions/get-time-string-from-hour.function';
import { IUrlAccessDate } from 'src/app/interfaces/url-access-date.interface';
import { IUrlAccessDay } from 'src/app/interfaces/url-access-day.interface';
import { IUrlAccessHour } from 'src/app/interfaces/url-access-hour.interface';
import { UrlAccessDataService } from 'src/app/services/url-access-data.service.ts/url-access-data.service';
import { UrlAccessService } from 'src/app/services/url-access/url-access.service';
import { Observable, forkJoin, map } from 'rxjs';
import { ITemporalChartsData } from '../interfaces/temporal-charts-data.interface';

@Injectable({
   providedIn: 'root'
})
export class TemporalChartsService {

   constructor(
      private readonly urlAccessService: UrlAccessService,
      private readonly urlAccessDataService: UrlAccessDataService
   ) { }

   public getTemporalChartsData(urlId: number): Observable<ITemporalChartsData> {
      return forkJoin([
         this.urlAccessService.listUrlAccessDates(urlId),
         this.urlAccessService.listUrlAccessDays(urlId),
         this.urlAccessService.listUrlAccessHours(urlId)
      ]).pipe(
         map(([dateResponse, dayResponse, hourResponse]) => {
            const data: ITemporalChartsData = {
               lastThirtyDaysData: new UrlAccessDataMap(),
               lastTwelveMonthsData: new UrlAccessDataMap(),
               daysOfWeekData: new UrlAccessDataMap(),
               hoursOfDayData: new UrlAccessDataMap()
            };
      
            if (dateResponse.body) {
               const urlAccessDates: IUrlAccessDate[] = dateResponse.body.urlAccesses ?? [];
               const convertedDates = this.convertDateStringToDate(urlAccessDates);
               data.lastThirtyDaysData = this.getLastThirtyDaysDataMap(convertedDates, urlId);
               data.lastTwelveMonthsData = this.getLastTwelveMonthsDataMap(convertedDates, urlId);
            }
      
            if (dayResponse.body) {
               const urlAccesses: IUrlAccessDay[] = dayResponse.body.urlAccesses ?? [];
               data.daysOfWeekData = this.getDaysOfWeekDataMap(urlAccesses, urlId);
            }
      
            if (hourResponse.body) {
               const urlAccesses: IUrlAccessHour[] = hourResponse.body.urlAccesses ?? [];
               data.hoursOfDayData = this.getHoursOfTheDayDataMap(urlAccesses, urlId);
            }
      
            return data;
         })
      );
   }

   private convertDateStringToDate(urlAccessDates: IUrlAccessDate[]): IUrlAccessDate[] {
      return urlAccessDates.map((urlAccessDate: IUrlAccessDate): IUrlAccessDate => {
         return {
            date: new Date(urlAccessDate.date),
            urlId: urlAccessDate.urlId,
            id: urlAccessDate.id,
            count: urlAccessDate.count
         }});
   }

   private getDaysOfWeekDataMap(urlAccesses: IUrlAccessDay[], urlId: number): UrlAccessDataMap {
      const daysOfWeek: IUrlAccessDay[] = Array<IUrlAccessDay>(7);
      for (let dayOfWeek: DayOfWeek = DayOfWeek.Sunday; dayOfWeek <= DayOfWeek.Saturday; dayOfWeek++) {
         daysOfWeek[DayOfWeekOrder[dayOfWeek]] = this.getUrlAccessDay(urlAccesses, dayOfWeek, urlId);
      }

      return this.urlAccessDataService.toUrlAccessDataMap(
         daysOfWeek,
         (urlAccess: IUrlAccessDay) => DayOfWeekName[urlAccess.day],
         false);
   }

   private getLastThirtyDaysDataMap(urlAccessDates: IUrlAccessDate[], urlId: number): UrlAccessDataMap {
      const lastThirtyDays: IUrlAccessDate[] = Array<IUrlAccessDate>(30);
      const date: Date = new Date();
      for (let day: number = 29; day >= 0; day--) {
         lastThirtyDays[day] = this.getUrlAccessDate(urlAccessDates, date, urlId);
         date.setDate(date.getDate() - 1);
      }

      return this.urlAccessDataService.toUrlAccessDataMap(
         lastThirtyDays,
         (urlAccess: IUrlAccessDate): string => urlAccess.date.toLocaleDateString(),
         false);
   }

   private getLastTwelveMonthsDataMap(urlAccessDates: IUrlAccessDate[], urlId: number): UrlAccessDataMap {
      const date: Date = new Date()
      date.setDate(1);
      const lastTwleveMonths: IUrlAccessDate[] = new Array<IUrlAccessDate>(12);
      for (let month: number = 11; month >= 0; month--) {
         lastTwleveMonths[month] = this.getUrlAccessMonth(urlAccessDates, date, urlId);
         date.setMonth(date.getMonth() - 1);
      };

      return this.urlAccessDataService.toUrlAccessDataMap(
         lastTwleveMonths,
         (urlAccess: IUrlAccessDate): string => urlAccess.date.toLocaleString('default', { month: 'long' }),
         false);
   }

   private getHoursOfTheDayDataMap(urlAccessHours: IUrlAccessHour[], urlId: number): UrlAccessDataMap {
      const hoursOfDay: IUrlAccessHour[] = new Array(24);
      for (let hour = 0; hour <= 23; hour++) {
         hoursOfDay[hour] = this.getUrlAccessHour(urlAccessHours, hour, urlId);
      }

      return this.urlAccessDataService.toUrlAccessDataMap(
         hoursOfDay,
         (urlAccess: IUrlAccessHour): string => getTimeStringFromHour(urlAccess.hour),
         false);
   }

   private getUrlAccessDay(urlAccessDays: IUrlAccessDay[], dayOfWeek: DayOfWeek, urlId: number): IUrlAccessDay {
      return urlAccessDays.find(dayAccesses => dayAccesses.day === dayOfWeek) ??
      {
         urlId: urlId,
         day: dayOfWeek,
         count: 0
      };
   }

   private getUrlAccessDate(urlAccessDates: IUrlAccessDate[], date: Date, urlId: number): IUrlAccessDate {
      return urlAccessDates.find((urlAccess: IUrlAccessDate) =>
         urlAccess.date.toLocaleDateString() === date.toLocaleDateString()) ??
      {
         urlId: urlId,
         date: new Date(date),
         count: 0
      };
   }

   private getUrlAccessMonth(urlAccessDates: IUrlAccessDate[], date: Date, urlId: number): IUrlAccessDate {
      const accessesThisMonth: IUrlAccessDate[] = urlAccessDates.filter((d) =>
         d.date.getMonth() === date.getMonth());

      return { 
         urlId: urlId,
         date: new Date(date),
         count: accessesThisMonth.reduce((acc, i) => acc = acc + i.count, 0)
      };
   }

   private getUrlAccessHour(urlAccessHours: IUrlAccessHour[], hour: number, urlId: number): IUrlAccessHour {
      return urlAccessHours.find(hourAccesses => hourAccesses.hour === hour) ??
      {
         urlId: urlId,
         hour: hour,
         count: 0
      }
   }
}
