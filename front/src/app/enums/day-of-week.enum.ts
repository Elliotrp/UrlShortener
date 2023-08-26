export enum DayOfWeek {
   Sunday,
   Monday,
   Tuesday,
   Wednesday,
   Thursday,
   Friday,
   Saturday
}

export const DayOfWeekName: Record<DayOfWeek, string> = {
   [DayOfWeek.Sunday]: 'Sunday',
   [DayOfWeek.Monday]: 'Monday',
   [DayOfWeek.Tuesday]: 'Tuesday',
   [DayOfWeek.Wednesday]: 'Wednesday',
   [DayOfWeek.Thursday]: 'Thursday',
   [DayOfWeek.Friday]: 'Friday',
   [DayOfWeek.Saturday]: 'Saturday'
}

export const DayOfWeekOrder: Record<DayOfWeek, number> = {
   [DayOfWeek.Monday]: 0,
   [DayOfWeek.Tuesday]: 1,
   [DayOfWeek.Wednesday]: 2,
   [DayOfWeek.Thursday]: 3,
   [DayOfWeek.Friday]: 4,
   [DayOfWeek.Saturday]: 5,
   [DayOfWeek.Sunday]: 6
}