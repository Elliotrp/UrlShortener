import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTooltipModule } from '../chart-tooltip/chart-tooltip.module';
import { VerticalBarComponent } from './vertical-bar.component';

@NgModule({
   declarations: [VerticalBarComponent],
   exports: [VerticalBarComponent],
   imports: [
      CommonModule,
      ChartTooltipModule
   ]
})
export class VerticalBarModule { }
