import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { temporalChartsResolver } from './temporal-charts.resolver';
import { ITemporalChartsData } from '../interfaces/temporal-charts-data.interface';

describe('temporalChartsResolver', () => {
  const executeResolver: ResolveFn<ITemporalChartsData> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => temporalChartsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
