import { TestBed } from '@angular/core/testing';

import { SexosService } from './sexos.service';

describe('SexosService', () => {
  let service: SexosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SexosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
