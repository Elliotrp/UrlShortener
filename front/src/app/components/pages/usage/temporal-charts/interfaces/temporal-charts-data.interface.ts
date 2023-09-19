import { UrlAccessDataMap } from "src/app/classes/url-access-data-map.class";

export interface ITemporalChartsData {
   lastThirtyDaysData: UrlAccessDataMap,
   lastTwelveMonthsData: UrlAccessDataMap,
   daysOfWeekData: UrlAccessDataMap,
   hoursOfDayData: UrlAccessDataMap
}