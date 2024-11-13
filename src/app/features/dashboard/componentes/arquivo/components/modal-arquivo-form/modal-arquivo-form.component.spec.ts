import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArquivoFormComponent } from './modal-arquivo-form.component';

describe('ModalArquivoFormComponent', () => {
  let component: ModalArquivoFormComponent;
  let fixture: ComponentFixture<ModalArquivoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalArquivoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalArquivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
