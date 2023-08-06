import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicChartsComponent } from './geographic-charts.component';

describe('GeographicChartsComponent', () => {
  let component: GeographicChartsComponent;
  let fixture: ComponentFixture<GeographicChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeographicChartsComponent]
    });
    fixture = TestBed.createComponent(GeographicChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
