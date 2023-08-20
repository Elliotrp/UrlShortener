import { TestBed } from '@angular/core/testing';

import { ChartTooltipService } from './chart-tooltip.service';

describe('ChartTooltipService', () => {
  let service: ChartTooltipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartTooltipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
