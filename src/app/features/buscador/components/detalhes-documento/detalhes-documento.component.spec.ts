import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDocumentoComponent } from './detalhes-documento.component';

describe('DetalhesArquivoComponent', () => {
  let component: DetalhesDocumentoComponent;
  let fixture: ComponentFixture<DetalhesDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
