import { TestBed } from '@angular/core/testing';

import { TemporalChartsService } from './temporal-charts.service';

describe('TemporalChartsService', () => {
  let service: TemporalChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporalChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
