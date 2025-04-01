import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoTableComponent } from './tabela-documento.component';

describe('ArquivoTableComponent', () => {
  let component: ArquivoTableComponent;
  let fixture: ComponentFixture<ArquivoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArquivoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArquivoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
