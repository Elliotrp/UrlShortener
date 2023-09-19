import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayLoadingRouterOutletComponent } from './overlay-loading-router-outlet.component';

describe('LoadingRouterOutletComponent', () => {
  let component: OverlayLoadingRouterOutletComponent;
  let fixture: ComponentFixture<OverlayLoadingRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayLoadingRouterOutletComponent]
    });
    fixture = TestBed.createComponent(OverlayLoadingRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
