import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { routes } from './usage-routing.module';
import { GeographicChartsModule } from './geographic-charts/geographic-charts.module';
import { UrlInfoModule } from '../../shared/url-info/url-info.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
   declarations: [UsageComponent],
   exports: [UsageComponent],
   imports: [
      CommonModule,
      GeographicChartsModule,
      MatCardModule,
      MatTabsModule,
      UrlInfoModule,
      RouterModule.forChild([routes])
   ]
})
export class UsageModule { }
