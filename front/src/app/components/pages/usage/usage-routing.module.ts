import { Route } from '@angular/router';
import { UsageComponent } from './usage.component';
import { GeographicChartsComponent } from './geographic-charts/geographic-charts.component';
import { usageResolver } from './usage.resolver';
import { TemporalChartsComponent } from './temporal-charts/temporal-charts.component';
import { MethodologicalChartsComponent } from './methodological-charts/methodological-charts.component';

export const routes: Route = 
{
   path: '',
   component: UsageComponent,
   resolve: {
      resolverData: usageResolver
   },
   children: [
      {
         path: '',
         redirectTo: 'when',
         pathMatch: 'full',
      },
      {
         path: 'when',
         component: TemporalChartsComponent
      },
      {
         path: 'where',
         component: GeographicChartsComponent
      },
      {
         path: 'how',
         component: MethodologicalChartsComponent
      }
   ]
};
