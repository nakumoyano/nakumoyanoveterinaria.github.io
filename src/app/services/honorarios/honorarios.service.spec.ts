import { TestBed } from '@angular/core/testing';

import { HonorariosService } from './honorarios.service';

describe('HonorariosService', () => {
  let service: HonorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HonorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
