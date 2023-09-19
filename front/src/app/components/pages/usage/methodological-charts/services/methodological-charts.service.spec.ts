import { TestBed } from '@angular/core/testing';

import { MethodologicalChartsService } from './methodological-charts.service';

describe('MethodologicalChartsService', () => {
  let service: MethodologicalChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodologicalChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
