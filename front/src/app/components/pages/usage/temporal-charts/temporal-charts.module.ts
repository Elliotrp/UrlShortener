import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporalChartsComponent } from './temporal-charts.component';
import { HorizontalBarModule } from 'src/app/components/shared/horizontal-bar/horizontal-bar.module';



@NgModule({
   exports: [TemporalChartsComponent],
   declarations: [TemporalChartsComponent],
   imports: [
      CommonModule,
      HorizontalBarModule
   ]
})
export class TemporalChartsModule { }
