import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalBarComponent } from './horizontal-bar.component';
import { ChartTooltipModule } from '../chart-tooltip/chart-tooltip.module';

@NgModule({
   declarations: [HorizontalBarComponent],
   exports: [HorizontalBarComponent],
   imports: [
      CommonModule,
      ChartTooltipModule
   ]
})
export class HorizontalBarModule { }
