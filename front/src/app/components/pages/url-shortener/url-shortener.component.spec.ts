import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlShortener } from './url-shortener.component';

describe('MainPageComponent', () => {
  let component: UrlShortener;
  let fixture: ComponentFixture<UrlShortener>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlShortener ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlShortener);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
