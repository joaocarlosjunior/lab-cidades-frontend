import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoArquivoTableComponent } from './tipo-arquivo-table.component';

describe('TipoArquivoTableComponent', () => {
  let component: TipoArquivoTableComponent;
  let fixture: ComponentFixture<TipoArquivoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoArquivoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoArquivoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
