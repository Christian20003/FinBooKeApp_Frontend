import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { SetCodeComponent } from './set-code.component';
import { FormInputErrorComponent } from 'src/app/shared';
import {
  getNativeElement,
  getNativeElements,
  triggerInput,
} from 'src/app/testing/testing-support';
import { getTranslocoModule } from 'src/app/shared/localization/transloco-testing';

describe('SetCodeComponent - Unit Tests', () => {
  let component: SetCodeComponent;
  let fixture: ComponentFixture<SetCodeComponent>;
  let nativeElements: HTMLInputElement[];
  let nativeButton: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCodeComponent, MockComponent(FormInputErrorComponent)],
      imports: [ReactiveFormsModule, getTranslocoModule()],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(SetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeButton = getNativeElement<SetCodeComponent, HTMLButtonElement>(
      fixture,
      '#proof-code-button'
    );
    nativeElements = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    for (const element of nativeElements) {
      element.value = '1';
    }
    triggerInput(nativeElements);
    fixture.detectChanges();
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).withContext('SetCodeComponent should exist').toBeTruthy();
  });

  /*--------------------------------------------------Input-Elements--------------------------------------------------------------*/

  it('U-Test-2: FormGroup should have defined number of FormControls', () => {
    for (let i = 0; i < component.size; i++) {
      const key = `value${i + 1}`;
      expect(component.form.get(key))
        .withContext(`Form control for code ${key} must exist`)
        .toBeTruthy();
    }
  });

  it('U-Test-3: Template should have defined number of input elements', () => {
    expect(nativeElements.length)
      .withContext(
        'Template does not contain the specified amount of input elements'
      )
      .toBe(component.size);
  });

  it('U-Test-4: A lower case letter should change automatically to an upper case letter', () => {
    for (const element of nativeElements) {
      element.value = 'a';
    }
    triggerInput(nativeElements);
    fixture.detectChanges();

    for (const element of nativeElements) {
      expect(element.value).withContext('Should be a upper case A').toBe('A');
    }
  });

  it('U-Test-5: An input element should remain blank if a non-permitted character is entered.', () => {
    for (const element of nativeElements) {
      element.value = '}';
    }
    triggerInput(nativeElements);
    fixture.detectChanges();

    for (const element of nativeElements) {
      expect(element.value)
        .withContext('Content of the input element should be empty string')
        .toBe('');
    }
  });

  it('U-Test-6: Input elements should contain only single characters', () => {
    let previous = undefined;
    for (const element of nativeElements) {
      element.value = '123';
      if (previous) {
        previous.value = '1';
        triggerInput([element, previous]);
      } else {
        triggerInput([element]);
      }
      fixture.detectChanges();

      expect(component.form.valid)
        .withContext('Form should be invalid because of breaking length rule')
        .toBeFalse();

      previous = element;
    }
  });

  it('U-Test-7: Change focus to next element after entering valid character', () => {
    for (let i = 0; i < component.size; i++) {
      const current = nativeElements[i];
      const next = nativeElements[i + 1];
      if (next) {
        spyOn(next, 'focus');
      }
      current.value = '1';
      triggerInput([current]);
      fixture.detectChanges();

      if (next) {
        expect(next.focus)
          .withContext('Next input element should be focused')
          .toHaveBeenCalled();
      }
    }
  });

  it('U-Test-8: Change focus to previous element after deleting a character', () => {
    const event = new KeyboardEvent('keydown', { key: 'Delete' });
    for (let i = component.size - 1; i >= 0; i--) {
      const current = nativeElements[i];
      const prev = nativeElements[i - 1];
      if (prev) {
        spyOn(prev, 'focus');
      }
      current.dispatchEvent(event);
      fixture.detectChanges();

      if (prev) {
        expect(prev.focus)
          .withContext('Previous input element should be focused')
          .toHaveBeenCalled();
      }
    }
  });

  /*--------------------------------------------------Invalid-Form-Behaviour------------------------------------------------------*/

  it('U-Test-9: Invalid-error message should appear after clicking submit button on invalid form', () => {
    nativeElements[0].value = '';
    triggerInput(nativeElements);
    nativeButton.click();
    fixture.detectChanges();
    const errorElement = getNativeElements<
      SetCodeComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');

    expect(errorElement)
      .withContext('An FormInputErrorComponent should exist')
      .toBeTruthy();
    expect(component.isValid)
      .withContext('The isValid boolean should be set to false')
      .toBeFalse();
  });

  it('U-Test-10: If code is incomplete after clicking submit button nothing should be emitted', () => {
    spyOn(component.send, 'emit');
    nativeElements[0].value = '';
    triggerInput(nativeElements);
    nativeButton.click();
    fixture.detectChanges();

    expect(component.send.emit)
      .withContext('Invalid code should not been emitted')
      .not.toHaveBeenCalled();
  });

  it('U-Test-11: Initial form should not display any error', () => {
    const errorMsg = getNativeElement<
      SetCodeComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');
    expect(errorMsg)
      .withContext(
        'FormInputErrorComponent should not appear after first rendering'
      )
      .toBeFalsy();
  });

  /*--------------------------------------------------Valid-Form-Behaviour--------------------------------------------------------*/

  it('U-Test-12: The emit function should be called if a valid input was entered', () => {
    spyOn(component.send, 'emit');
    nativeButton.click();
    expect(component.send.emit)
      .withContext('Valid code should be emitted')
      .toHaveBeenCalled();
  });
});
