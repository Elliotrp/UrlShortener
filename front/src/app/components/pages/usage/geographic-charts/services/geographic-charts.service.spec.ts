import { TestBed } from '@angular/core/testing';

import { GeographicChartsService } from './geographic-charts.service';

describe('GeographicChartsService', () => {
  let service: GeographicChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeographicChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
