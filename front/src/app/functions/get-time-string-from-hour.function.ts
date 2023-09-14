export function getTimeStringFromHour(hour: number): string {
   if (hour === 0) {
      return 'Midnight';
   }

   if (hour === 12) {
      return 'Noon';
   }

   if (hour > 12) {
      return (hour - 12).toString() + ' pm';
   }

   return hour.toString() + ' am';
}