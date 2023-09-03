import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericClicksTooltipComponent } from './generic-clicks-tooltip.component';

describe('DayChartTooltipComponent', () => {
  let component: GenericClicksTooltipComponent;
  let fixture: ComponentFixture<GenericClicksTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericClicksTooltipComponent]
    });
    fixture = TestBed.createComponent(GenericClicksTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
