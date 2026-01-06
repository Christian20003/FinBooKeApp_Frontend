import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { FormInputErrorComponent } from './form-input-error';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { getNativeElement } from 'src/app/testing/testing-support';

describe('FormInputErrorComponent - Unit Tests', () => {
  let component: FormInputErrorComponent;
  let fixture: ComponentFixture<FormInputErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, FormInputErrorComponent],
      providers: [provideHttpClient(), provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(FormInputErrorComponent);
    fixture.componentRef.setInput('message', 'Error message');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).withContext('This component should exist').toBeTruthy();
  });

  it('U-Test-2: Message should be displayed', () => {
    const element = getNativeElement<
      FormInputErrorComponent,
      HTMLParagraphElement
    >(fixture, 'p');
    expect(element.innerText).toBe(component.message());
  });
});
