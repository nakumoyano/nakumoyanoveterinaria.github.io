import { TestBed } from '@angular/core/testing';

import { InternacionesService } from './internaciones.service';

describe('InternacionesService', () => {
  let service: InternacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
