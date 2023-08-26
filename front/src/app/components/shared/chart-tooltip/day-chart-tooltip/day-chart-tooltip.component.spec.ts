import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayChartTooltipComponent } from './day-chart-tooltip.component';

describe('DayChartTooltipComponent', () => {
  let component: DayChartTooltipComponent;
  let fixture: ComponentFixture<DayChartTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayChartTooltipComponent]
    });
    fixture = TestBed.createComponent(DayChartTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
