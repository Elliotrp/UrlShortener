import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { ChoroplethModule } from '../../shared/choropleth/choropleth.module';

@NgModule({
   declarations: [AnalyticsComponent],
   exports: [AnalyticsComponent],
   imports: [
      CommonModule,
      ChoroplethModule
   ]
})
export class AnalyticsModule { }
