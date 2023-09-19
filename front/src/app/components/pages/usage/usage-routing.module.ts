import { Route } from '@angular/router';
import { UsageComponent } from './usage.component';
import { GeographicChartsComponent } from './geographic-charts/geographic-charts.component';
import { usageResolver } from './resolver/usage.resolver';
import { TemporalChartsComponent } from './temporal-charts/temporal-charts.component';
import { MethodologicalChartsComponent } from './methodological-charts/methodological-charts.component';
import { temporalChartsResolver } from './temporal-charts/resolver/temporal-charts.resolver';
import { geographicChartsResolver } from './geographic-charts/resolver/geographic-charts.resolver';
import { methodologicalChartsResolver } from './methodological-charts/resolver/methodological-charts.resolver';

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
         component: TemporalChartsComponent,
         resolve: {
            resolverData: temporalChartsResolver
         }
      },
      {
         path: 'where',
         component: GeographicChartsComponent,
         resolve: {
            resolverData: geographicChartsResolver
         },
      },
      {
         path: 'how',
         component: MethodologicalChartsComponent,
         resolve: {
            resolverData: methodologicalChartsResolver
         },
      }
   ]
};
