import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { geographicChartsResolver } from './geographic-charts.resolver';
import { IGeographicChartsData } from '../interfaces/geographic-charts-data.interface';

describe('geographicChartsResolver', () => {
  const executeResolver: ResolveFn<IGeographicChartsData> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => geographicChartsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
