import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { methodologicalChartsResolver } from './methodological-charts.resolver';
import { IMethodologicalChartsData } from '../interfaces/methodological-charts-data.interface';

describe('methodologicalChartsResolver', () => {
  const executeResolver: ResolveFn<IMethodologicalChartsData> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => methodologicalChartsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
