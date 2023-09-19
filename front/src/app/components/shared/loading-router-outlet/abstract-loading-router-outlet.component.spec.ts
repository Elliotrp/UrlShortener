import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractLoadingRouterOutletComponent } from './abstract-loading-router-outlet.component';

describe('AbstractLoadingRouterOutletComponent', () => {
  let component: AbstractLoadingRouterOutletComponent;
  let fixture: ComponentFixture<AbstractLoadingRouterOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractLoadingRouterOutletComponent]
    });
    fixture = TestBed.createComponent(AbstractLoadingRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
