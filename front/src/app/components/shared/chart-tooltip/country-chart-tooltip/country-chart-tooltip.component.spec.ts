import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryChartTooltipComponent } from './country-chart-tooltip.component';

describe('CountryChartTooltipComponent', () => {
  let component: CountryChartTooltipComponent;
  let fixture: ComponentFixture<CountryChartTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryChartTooltipComponent]
    });
    fixture = TestBed.createComponent(CountryChartTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
