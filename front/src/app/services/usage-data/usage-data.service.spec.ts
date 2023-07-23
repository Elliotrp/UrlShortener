import { TestBed } from '@angular/core/testing';

import { UsageDataService } from './usage-data.service';

describe('UsageDataService', () => {
  let service: UsageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
