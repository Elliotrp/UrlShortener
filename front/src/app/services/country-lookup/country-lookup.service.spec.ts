import { TestBed } from '@angular/core/testing';

import { CountryLookupService } from './country-lookup.service';

describe('CountryLookupService', () => {
  let service: CountryLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
