import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoroplethModule } from '../../../shared/choropleth/choropleth.module';
import { GeographicChartsComponent } from './geographic-charts.component';
import { HorizontalBarModule } from 'src/app/components/shared/horizontal-bar/horizontal-bar.module';

@NgModule({
   declarations: [GeographicChartsComponent],
   exports: [GeographicChartsComponent],
   imports: [
      CommonModule,
      ChoroplethModule,
      HorizontalBarModule
   ]
})
export class GeographicChartsModule { }
