import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoroplethComponent } from './choropleth.component';
import { ChartTooltipModule } from '../chart-tooltip/chart-tooltip.module';

@NgModule({
   declarations: [ChoroplethComponent],
   exports: [ChoroplethComponent],
   imports: [
      CommonModule,
      ChartTooltipModule
   ]
})
export class ChoroplethModule { }
