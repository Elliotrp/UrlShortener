import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryChartTooltipComponent } from './country-chart-tooltip/country-chart-tooltip.component';
import { GenericClicksTooltipComponent } from './generic-clicks-tooltip/generic-clicks-tooltip.component';

@NgModule({
   declarations: [CountryChartTooltipComponent, GenericClicksTooltipComponent],
   exports: [CountryChartTooltipComponent, GenericClicksTooltipComponent],
   imports: [
      CommonModule
   ]
})
export class ChartTooltipModule { }
