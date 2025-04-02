import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaLocalidadeComponent } from './tabela-localidade.component';

describe('TabelaLocalidadeComponent', () => {
  let component: TabelaLocalidadeComponent;
  let fixture: ComponentFixture<TabelaLocalidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaLocalidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaLocalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
