import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { usageResolver } from './usage.resolver';

describe('usageResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => usageResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
