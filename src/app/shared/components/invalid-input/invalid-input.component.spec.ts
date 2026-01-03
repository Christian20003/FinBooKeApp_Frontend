import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { InvalidInputComponent } from './invalid-input.component';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { getNativeElement } from 'src/app/testing/testing-support';

describe('InvalidInputComponent - Unit Tests', () => {
  let component: InvalidInputComponent;
  let fixture: ComponentFixture<InvalidInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, InvalidInputComponent],
      providers: [provideHttpClient(), provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(InvalidInputComponent);
    fixture.componentRef.setInput('message', 'Error message');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).withContext('This component should exist').toBeTruthy();
  });

  it('U-Test-2: Message should be displayed', () => {
    const element = getNativeElement<
      InvalidInputComponent,
      HTMLParagraphElement
    >(fixture, 'p');
    expect(element.innerText).toBe(component.message());
  });
});
