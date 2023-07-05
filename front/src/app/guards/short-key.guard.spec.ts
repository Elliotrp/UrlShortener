import { TestBed } from '@angular/core/testing';

import { ShortKeyGuard } from './short-key.guard';

describe('ShortKeyGuard', () => {
   let guard: ShortKeyGuard;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      guard = TestBed.inject(ShortKeyGuard);
   });

   it('should be created', () => {
      expect(guard).toBeTruthy();
   });
});
