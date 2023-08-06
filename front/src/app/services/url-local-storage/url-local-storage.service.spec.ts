import { TestBed } from '@angular/core/testing';

import { UrlLocalStorageService } from './url-local-storage.service';

describe('UrlLocalStorageService', () => {
  let service: UrlLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
