import { TestBed } from '@angular/core/testing';

import { EstadoService } from './state.service';

describe('EstadoService', () => {
  let service: EstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
