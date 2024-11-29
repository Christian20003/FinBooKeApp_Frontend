import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCodeComponent } from './set-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { InvalidInputComponent } from 'src/app/shared';
import {
  getNativeElement,
  getNativeElements,
  triggerInput,
} from 'src/app/testing/testing-support';

describe('SetCodeComponent - Unit Tests', () => {
  let component: SetCodeComponent;
  let fixture: ComponentFixture<SetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCodeComponent, MockComponent(InvalidInputComponent)],
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(SetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).toBeTruthy();
  });

  /*--------------------------------------------------Input-Elements--------------------------------------------------------------*/

  it('U-Test-2: Code form should consists of 6 input elements', () => {
    const codeInput = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    for (let i = 1; i < 7; i++) {
      expect(component.codeForm.get('value' + i)).toBeTruthy();
    }
    expect(codeInput.length).toBe(6);
  });

  it('U-Test-3: Only numbers between 0 and 9 can be entered on a single input element', () => {
    const codeInput = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    for (const element of codeInput) {
      element.value = '1';
    }
    triggerInput([...codeInput]);
    let previous = undefined;
    for (const element of codeInput) {
      element.value = '123';
      if (previous) {
        previous.value = '1';
        triggerInput([element, previous]);
      } else {
        triggerInput([element]);
      }
      fixture.detectChanges();
      expect(component.codeForm.valid).toBeFalse();
      previous = element;
    }
  });

  it('U-Test-4: After entering a valid value to an input element, the focus should switch to the next element', () => {
    const size = 6;
    const codeInput = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    for (let i = 0; i < size; i++) {
      if (codeInput[i + 1]) {
        spyOn(codeInput[i + 1], 'focus');
      }
      codeInput[i].value = '1';
      triggerInput([codeInput[i]]);
      fixture.detectChanges();
      if (codeInput[i + 1]) {
        expect(codeInput[i + 1].focus).toHaveBeenCalled();
      }
    }
  });

  /*--------------------------------------------------Invalid-Form-Behaviour------------------------------------------------------*/

  it('U-Test-5: If code is incomplete after clicking submit button an invalid-error message should appear', () => {
    const codeInput = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    const button = getNativeElement<SetCodeComponent, HTMLButtonElement>(
      fixture,
      '#proof-code-button'
    );
    codeInput[0].value = '1';
    codeInput[1].value = '2';
    triggerInput(codeInput);
    button.click();
    fixture.detectChanges();
    const errorElement = getNativeElements<
      SetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(errorElement).toBeTruthy();
    expect(component.isInvalid).toBeTrue();
  });

  it('U-Test-6: If code is incomplete after clicking submit button nothing should be emitted', () => {
    spyOn(component.sendCode, 'emit');
    const codeInput = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    const button = getNativeElement<SetCodeComponent, HTMLButtonElement>(
      fixture,
      '#proof-code-button'
    );
    codeInput[0].value = '1';
    codeInput[1].value = '2';
    triggerInput(codeInput);
    button.click();
    fixture.detectChanges();
    expect(component.sendCode.emit).not.toHaveBeenCalled();
  });

  it('U-Test-7: Initial incomplete code form should not display any error', () => {
    const errorMsg = getNativeElement<SetCodeComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );
    expect(errorMsg).toBeFalsy();
  });

  /*--------------------------------------------------Valid-Form-Behaviour--------------------------------------------------------*/

  it('U-Test-8: After improving the invalid code, the error message should disappear', () => {
    const codeInput = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    codeInput[0].value = '1';
    triggerInput([codeInput[0]]);
    fixture.detectChanges();
    for (const element of codeInput) {
      element.value = '1';
    }
    triggerInput(codeInput);
    fixture.detectChanges();
    const errorMsg = getNativeElement<SetCodeComponent, InvalidInputComponent>(
      fixture,
      'app-invalid-input'
    );
    expect(errorMsg).toBeFalsy();
  });

  it('U-Test-9: The emit function should be called if a valid input was entered and the submit button was clicked', () => {
    spyOn(component.sendCode, 'emit');
    const codeInput = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    const button = getNativeElement<SetCodeComponent, HTMLButtonElement>(
      fixture,
      '#proof-code-button'
    );
    for (const element of codeInput) {
      element.value = '1';
    }
    triggerInput(codeInput);
    fixture.detectChanges();
    button.click();
    expect(component.sendCode.emit).toHaveBeenCalled();
  });
});
