import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoArquivoComponent } from './tipo-arquivo.component';

describe('TipoArquivoComponent', () => {
  let component: TipoArquivoComponent;
  let fixture: ComponentFixture<TipoArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
