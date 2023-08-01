import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoroplethModule } from '../../../shared/choropleth/choropleth.module';
import { GeographicChartsComponent } from './geographic-charts.component';

@NgModule({
  declarations: [GeographicChartsComponent],
  exports: [GeographicChartsComponent],
  imports: [
    CommonModule,
    ChoroplethModule
  ]
})
export class GeographicChartsModule { }
