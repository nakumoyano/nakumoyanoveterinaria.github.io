import { TestBed } from '@angular/core/testing';

import { GalenosService } from './galenos-honorarios.service';

describe('GalenosService', () => {
  let service: GalenosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalenosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
