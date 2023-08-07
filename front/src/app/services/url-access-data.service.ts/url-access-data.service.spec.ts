import { TestBed } from '@angular/core/testing';

import { UrlAccessDataService } from './url-access-data.service';

describe('UrlAccessDataService', () => {
  let service: UrlAccessDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlAccessDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
