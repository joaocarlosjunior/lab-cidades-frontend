import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalharDocumentoComponent } from './modal-detalhar-documento.component';

describe('ModalDetalharDocumentoComponent', () => {
  let component: ModalDetalharDocumentoComponent;
  let fixture: ComponentFixture<ModalDetalharDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDetalharDocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDetalharDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
