import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoadingRouterOutletComponent } from './spinner-loading-router-outlet.component';

describe('SpinnerLoadingRouterOutletComponent', () => {
  let component: SpinnerLoadingRouterOutletComponent;
  let fixture: ComponentFixture<SpinnerLoadingRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerLoadingRouterOutletComponent]
    });
    fixture = TestBed.createComponent(SpinnerLoadingRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
