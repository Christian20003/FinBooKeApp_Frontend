import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
