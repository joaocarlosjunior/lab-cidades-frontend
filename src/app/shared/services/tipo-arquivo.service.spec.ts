import { TestBed } from '@angular/core/testing';

import { TipoArquivoService } from './tipo-arquivo.service';

describe('TipoArquivoService', () => {
  let service: TipoArquivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoArquivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
