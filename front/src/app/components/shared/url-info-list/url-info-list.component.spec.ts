import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlInfoListComponent } from './url-info-list.component';

describe('UrlInfoComponent', () => {
   let component: UrlInfoListComponent;
   let fixture: ComponentFixture<UrlInfoListComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [UrlInfoListComponent]
      })
         .compileComponents();

      fixture = TestBed.createComponent(UrlInfoListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
