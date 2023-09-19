import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IMethodologicalChartsData } from '../interfaces/methodological-charts-data.interface';
import { IUrl } from 'src/app/interfaces/url.interface';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { IUsageResolverData } from '../../usage-resolver-data.interface';
import { MethodologicalChartsService } from '../services/methodological-charts.service';

export const methodologicalChartsResolver: ResolveFn<IMethodologicalChartsData> = (
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
) => {
   const resolverData: IUsageResolverData = route.parent?.data['resolverData'];
   const url: IUrl = resolverData.url;
   if (url) {
      return inject(MethodologicalChartsService).getMethodologicalChartsData(url.id)
   }

   return EMPTY;
};