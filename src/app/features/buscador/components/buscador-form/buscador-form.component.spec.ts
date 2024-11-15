import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorFormComponent } from './buscador-form.component';

describe('BuscadorFormComponent', () => {
  let component: BuscadorFormComponent;
  let fixture: ComponentFixture<BuscadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
