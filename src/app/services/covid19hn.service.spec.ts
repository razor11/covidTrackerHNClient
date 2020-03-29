import { TestBed } from '@angular/core/testing';

import { Covid19hnService } from './covid19hn.service';

describe('Covid19hnService', () => {
  let service: Covid19hnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Covid19hnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
