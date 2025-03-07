import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadeModalComponent } from './localidade-modal.component';

describe('LocalidadeModalComponent', () => {
  let component: LocalidadeModalComponent;
  let fixture: ComponentFixture<LocalidadeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalidadeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalidadeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
