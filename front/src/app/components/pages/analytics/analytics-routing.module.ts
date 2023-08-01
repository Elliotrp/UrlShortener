import { Route } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { GeographicChartsComponent } from './geographic-charts/geographic-charts.component';
import { NotFoundComponent } from '../not-found/not-found.component';

export const routes: Route = 
{
   path: '',
   component: AnalyticsComponent,
   children: [
      {
         path: '',
         component: NotFoundComponent
      },
      {
         path: 'When',
         component: NotFoundComponent
      },
      {
         path: 'Where',
         component: GeographicChartsComponent
      },
      {
         path: 'How',
         component: NotFoundComponent
      }
   ]
};
