import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryChartTooltipComponent } from './country-chart-tooltip/country-chart-tooltip.component';

@NgModule({
   declarations: [CountryChartTooltipComponent],
   exports: [CountryChartTooltipComponent],
   imports: [
      CommonModule
   ]
})
export class ChartTooltipModule { }
