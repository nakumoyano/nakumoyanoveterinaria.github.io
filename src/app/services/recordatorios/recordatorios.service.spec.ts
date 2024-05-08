import { TestBed } from '@angular/core/testing';

import { RecordatoriosService } from './recordatorios.service';

describe('RecordatoriosService', () => {
  let service: RecordatoriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordatoriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
