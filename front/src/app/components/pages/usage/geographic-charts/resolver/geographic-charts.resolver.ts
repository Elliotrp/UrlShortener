import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { EMPTY } from 'rxjs';
import { IUrl } from 'src/app/interfaces/url.interface';
import { IUsageResolverData } from '../../usage-resolver-data.interface';
import { IGeographicChartsData } from '../interfaces/geographic-charts-data.interface';
import { GeographicChartsService } from '../services/geographic-charts.service';

export const geographicChartsResolver: ResolveFn<IGeographicChartsData> = (
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
) => {
   const resolverData: IUsageResolverData = route.parent?.data['resolverData'];
   const url: IUrl = resolverData.url;
   if (url) {
      return inject(GeographicChartsService).getGeographicChartsData(url.id)
   }

   return EMPTY;
};
