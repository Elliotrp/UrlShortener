import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { usageResolver } from './usage.resolver';
import { IUsageResolverData } from '../usage-resolver-data.interface';

describe('usageResolver', () => {
  const executeResolver: ResolveFn<IUsageResolverData | undefined> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => usageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
