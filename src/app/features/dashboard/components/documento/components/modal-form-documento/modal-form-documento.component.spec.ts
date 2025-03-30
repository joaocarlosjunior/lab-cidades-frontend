import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormDocumentoComponent } from './modal-form-documento.component';

describe('ModalFormDocumentoComponent', () => {
  let component: ModalFormDocumentoComponent;
  let fixture: ComponentFixture<ModalFormDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
