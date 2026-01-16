import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { SetAccessCode } from './set-access-code';
import { FormInputError, getTranslocoModule } from 'src/app/shared';
import {
  getHTMLElement,
  getHTMLElements,
} from 'src/app/testing/helper/get-html-element';
import { setInputValues } from 'src/app/testing/helper/set-input-values';
import { getComponent } from 'src/app/testing/helper/get-component';

describe('SetAccessCode - Unit Tests', () => {
  let component: SetAccessCode;
  let fixture: ComponentFixture<SetAccessCode>;
  let nativeElements: HTMLInputElement[];
  let nativeButton: HTMLButtonElement | undefined;
  let formSize: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SetAccessCode,
        MockComponent(FormInputError),
        ReactiveFormsModule,
        getTranslocoModule(),
      ],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(SetAccessCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // @ts-expect-error Get size of form
    formSize = component.size;
    nativeButton = getHTMLElement<HTMLButtonElement>(
      fixture,
      '#proof-code-button'
    );
    nativeElements = getHTMLElements<HTMLInputElement>(fixture, '.key-field');
    for (const element of nativeElements) {
      element.value = '1';
    }
    setInputValues(nativeElements);
    fixture.detectChanges();
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Component should have defined number of FormControls', () => {
    // @ts-expect-error Get FormGroup
    const form = component.form;
    for (let i = 0; i < formSize; i++) {
      const key = `value${i + 1}`;
      expect(form.get(key)).toBeTruthy();
    }
  });

  it('U-Test-3: Component template should have defined number of input elements', () => {
    expect(nativeElements.length).toBe(formSize);
  });

  it('U-Test-4: Component should change a lower case letter automatically to an upper case letter', async () => {
    for (const element of nativeElements) {
      element.value = 'a';
    }
    setInputValues(nativeElements);
    await fixture.whenStable();

    for (const element of nativeElements) {
      expect(element.value).toBe('A');
    }
  });

  it('U-Test-5: Component should ignore non-permitted character', async () => {
    for (const element of nativeElements) {
      element.value = '}';
    }
    setInputValues(nativeElements);
    await fixture.whenStable();

    for (const element of nativeElements) {
      expect(element.value).toBe('');
    }
  });

  it('U-Test-6: Component input elements should contain only single characters', async () => {
    // @ts-expect-error Get FormGroup
    const form = component.form;
    let previous = undefined;
    for (const element of nativeElements) {
      element.value = '123';
      if (previous) {
        previous.value = '1';
        setInputValues([element, previous]);
      } else {
        setInputValues([element]);
      }
      await fixture.whenStable();
      previous = element;

      expect(form.valid).toBeFalse();
    }
  });

  it('U-Test-7: Component should change focus to next element after entering valid character', async () => {
    for (let i = 0; i < formSize; i++) {
      const current = nativeElements[i];
      const next = nativeElements[i + 1];
      if (next) {
        spyOn(next, 'focus');
      }
      current.value = '1';
      setInputValues([current]);
      await fixture.whenStable();

      if (next) {
        expect(next.focus).toHaveBeenCalled();
      }
    }
  });

  it('U-Test-8: Component should change focus to previous element after deleting a character', async () => {
    const event = new KeyboardEvent('keydown', { key: 'Delete' });
    for (let i = formSize - 1; i >= 0; i--) {
      const current = nativeElements[i];
      const prev = nativeElements[i - 1];
      if (prev) {
        spyOn(prev, 'focus');
      }
      current.dispatchEvent(event);
      await fixture.whenStable();

      if (prev) {
        expect(prev.focus).toHaveBeenCalled();
      }
    }
  });

  it('U-Test-9: Component should display FormInputError after clicking submit button on invalid form', async () => {
    nativeElements[0].value = '';
    setInputValues(nativeElements);
    nativeButton?.click();
    await fixture.whenStable();

    const errorElement = getComponent<FormInputError>(fixture, FormInputError);

    expect(errorElement).toBeTruthy();
  });

  it('U-Test-10: Component should not emit an invalid code', async () => {
    spyOn(component.send, 'emit');
    nativeElements[0].value = '';
    setInputValues(nativeElements);
    nativeButton?.click();
    await fixture.whenStable();

    expect(component.send.emit).not.toHaveBeenCalled();
  });

  it('U-Test-11: Component should not display FormInputError if any input field is not dirty', () => {
    const errorMsg = getComponent<FormInputError>(fixture, FormInputError);

    expect(errorMsg).toBeFalsy();
  });

  it('U-Test-12: Component should emit a valid input', () => {
    spyOn(component.send, 'emit');
    nativeButton?.click();

    expect(component.send.emit).toHaveBeenCalled();
  });
});
