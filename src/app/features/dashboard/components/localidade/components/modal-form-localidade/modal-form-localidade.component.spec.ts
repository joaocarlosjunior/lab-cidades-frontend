import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormLocalidadeComponent } from './modal-form-localidade.component';

describe('LocalidadeModalComponent', () => {
  let component: ModalFormLocalidadeComponent;
  let fixture: ComponentFixture<ModalFormLocalidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormLocalidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormLocalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
