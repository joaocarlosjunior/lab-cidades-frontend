import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormTipoDocumentoComponent } from './modal-form-tipo-documento.component';

describe('ModalFormTipoDocumentoComponent', () => {
  let component: ModalFormTipoDocumentoComponent;
  let fixture: ComponentFixture<ModalFormTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormTipoDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
