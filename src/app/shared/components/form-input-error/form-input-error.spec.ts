import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { FormInputError } from './form-input-error';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';

describe('FormInputError - Unit Tests', () => {
  let component: FormInputError;
  let fixture: ComponentFixture<FormInputError>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, FormInputError],
      providers: [provideHttpClient(), provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(FormInputError);
    fixture.componentRef.setInput('message', 'Error message');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).withContext('This component should exist').toBeTruthy();
  });

  it('U-Test-2: Message should be displayed', () => {
    const element = getHTMLElement<HTMLParagraphElement>(fixture, 'p')!;
    expect(element.innerText).toBe(component.message());
  });
});
