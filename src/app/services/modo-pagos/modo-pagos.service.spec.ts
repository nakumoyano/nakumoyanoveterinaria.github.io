import { TestBed } from '@angular/core/testing';

import { ModoPagosService } from './modo-pagos.service';

describe('ModoPagosService', () => {
  let service: ModoPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModoPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
