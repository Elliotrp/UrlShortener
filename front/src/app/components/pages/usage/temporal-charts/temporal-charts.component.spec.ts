import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalChartsComponent } from './temporal-charts.component';

describe('TemporalChartsComponent', () => {
  let component: TemporalChartsComponent;
  let fixture: ComponentFixture<TemporalChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporalChartsComponent]
    });
    fixture = TestBed.createComponent(TemporalChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
