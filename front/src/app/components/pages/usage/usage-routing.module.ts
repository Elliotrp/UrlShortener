import { Route } from '@angular/router';
import { UsageComponent } from './usage.component';
import { GeographicChartsComponent } from './geographic-charts/geographic-charts.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { usageResolver } from './usage.resolver';

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
         component: NotFoundComponent
      },
      {
         path: 'where',
         component: GeographicChartsComponent
      },
      {
         path: 'how',
         component: NotFoundComponent
      }
   ]
};
