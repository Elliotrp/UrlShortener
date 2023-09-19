import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { EMPTY } from 'rxjs';
import { IUsageResolverData } from '../../usage-resolver-data.interface';
import { IUrl } from 'src/app/interfaces/url.interface';
import { TemporalChartsService } from '../services/temporal-charts.service';
import { ITemporalChartsData } from '../interfaces/temporal-charts-data.interface';

export const temporalChartsResolver: ResolveFn<ITemporalChartsData> = (
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
) => {
   const resolverData: IUsageResolverData = route.parent?.data['resolverData'];
   const url: IUrl = resolverData.url;
   if (url) {
      return inject(TemporalChartsService).getTemporalChartsData(url.id)
   }

   return EMPTY;
};
