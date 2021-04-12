import { TestBed } from '@angular/core/testing';

import { SecurePagesService } from './secure-pages.service';

describe('SecurePagesService', () => {
  let service: SecurePagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurePagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
