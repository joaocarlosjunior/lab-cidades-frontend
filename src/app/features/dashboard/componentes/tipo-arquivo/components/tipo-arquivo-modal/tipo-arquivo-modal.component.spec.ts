import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoArquivoModalComponent } from './tipo-arquivo-modal.component';

describe('TipoArquivoModalComponent', () => {
  let component: TipoArquivoModalComponent;
  let fixture: ComponentFixture<TipoArquivoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoArquivoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoArquivoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
