import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardArquivoComponent } from './card-arquivo.component';

describe('CardArquivoComponent', () => {
  let component: CardArquivoComponent;
  let fixture: ComponentFixture<CardArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
