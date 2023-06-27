import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlInfoComponent } from './url-info.component';

describe('UrlInfoComponent', () => {
  let component: UrlInfoComponent;
  let fixture: ComponentFixture<UrlInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
