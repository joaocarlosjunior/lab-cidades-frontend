import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoDashboardComponent } from './card-info-dashboard.component';

describe('CardInfoDashboardComponent', () => {
  let component: CardInfoDashboardComponent;
  let fixture: ComponentFixture<CardInfoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardInfoDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardInfoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
