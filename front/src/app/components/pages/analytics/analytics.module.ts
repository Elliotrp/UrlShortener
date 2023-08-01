import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { routes } from './analytics-routing.module';
import { GeographicChartsModule } from './geographic-charts/geographic-charts.module';

@NgModule({
   declarations: [AnalyticsComponent],
   exports: [AnalyticsComponent],
   imports: [
      CommonModule,
      GeographicChartsModule,
      MatTabsModule,
      RouterModule.forChild([routes])
   ]
})
export class AnalyticsModule { }
