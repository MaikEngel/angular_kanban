import { TestBed } from '@angular/core/testing';

import { GlobalArrayService } from './global-array.service';

describe('GlobalArrayService', () => {
  let service: GlobalArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
