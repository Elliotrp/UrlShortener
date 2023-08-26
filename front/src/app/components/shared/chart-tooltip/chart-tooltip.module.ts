import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryChartTooltipComponent } from './country-chart-tooltip/country-chart-tooltip.component';
import { DayChartTooltipComponent } from './day-chart-tooltip/day-chart-tooltip.component';

@NgModule({
   declarations: [CountryChartTooltipComponent, DayChartTooltipComponent],
   exports: [CountryChartTooltipComponent],
   imports: [
      CommonModule
   ]
})
export class ChartTooltipModule { }
