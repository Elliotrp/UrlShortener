import { TestBed } from '@angular/core/testing';

import { UrlAccessService } from './url-access.service';

describe('UrlAccessService', () => {
  let service: UrlAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
