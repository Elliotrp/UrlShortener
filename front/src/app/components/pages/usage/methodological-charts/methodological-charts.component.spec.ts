import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodologicalChartsComponent } from './methodological-charts.component';

describe('MethodologicalChartsComponent', () => {
  let component: MethodologicalChartsComponent;
  let fixture: ComponentFixture<MethodologicalChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodologicalChartsComponent]
    });
    fixture = TestBed.createComponent(MethodologicalChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
