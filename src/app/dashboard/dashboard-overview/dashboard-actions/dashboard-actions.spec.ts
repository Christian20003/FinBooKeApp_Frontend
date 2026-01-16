import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActions } from './dashboard-actions';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DashboardActions', () => {
  let component: DashboardActions;
  let fixture: ComponentFixture<DashboardActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardActions],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
