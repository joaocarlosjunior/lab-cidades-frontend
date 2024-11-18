import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesArquivoComponent } from './detalhes-arquivo.component';

describe('DetalhesArquivoComponent', () => {
  let component: DetalhesArquivoComponent;
  let fixture: ComponentFixture<DetalhesArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
