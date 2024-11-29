import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { InvalidInputComponent } from './invalid-input.component';
import { provideHttpClient } from '@angular/common/http';

describe('InvalidInputComponent - Unit Tests', () => {
  let component: InvalidInputComponent;
  let fixture: ComponentFixture<InvalidInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidInputComponent],
      imports: [MatIconModule],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(InvalidInputComponent);
    fixture.componentRef.setInput('message', 'Error message');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).withContext('This component should exist').toBeTruthy();
  });
});
