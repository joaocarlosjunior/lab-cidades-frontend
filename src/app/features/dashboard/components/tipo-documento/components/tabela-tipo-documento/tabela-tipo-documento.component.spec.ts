import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaTipoDocumentoComponent } from './tabela-tipo-documento.component';

describe('TabelaTipoDocumentoComponent', () => {
  let component: TabelaTipoDocumentoComponent;
  let fixture: ComponentFixture<TabelaTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaTipoDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
