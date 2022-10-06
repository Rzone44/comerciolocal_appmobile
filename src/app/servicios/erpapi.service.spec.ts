import { TestBed } from '@angular/core/testing';

import { ERPApiService } from './erpapi.service';

describe('ERPApiService', () => {
  let service: ERPApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ERPApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
