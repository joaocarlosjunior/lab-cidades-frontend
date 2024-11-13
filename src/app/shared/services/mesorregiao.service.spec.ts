import { TestBed } from '@angular/core/testing';

import { MesorregiaoService } from './mesorregiao.service';

describe('MesorregiaoService', () => {
  let service: MesorregiaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesorregiaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
