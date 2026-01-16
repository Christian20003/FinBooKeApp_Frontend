import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MockComponent } from 'ng-mocks';
import { RequestAccessCode } from './request-access-code';
import { FormInputError, getTranslocoModule } from 'src/app/shared';
import { setInputSignal } from 'src/app/testing/helper/set-input-signal';
import { getComponent } from 'src/app/testing/helper/get-component';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { setInputValues } from 'src/app/testing/helper/set-input-values';

describe('RequestAccessCode - Unit Tests', () => {
  let component: RequestAccessCode;
  let fixture: ComponentFixture<RequestAccessCode>;
  const email = 'test@test.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RequestAccessCode,
        MockComponent(FormInputError),
        MockComponent(MatIcon),
        ReactiveFormsModule,
        getTranslocoModule(),
      ],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(RequestAccessCode);
    component = fixture.componentInstance;
    setInputSignal(fixture, 'email', email);
    fixture.detectChanges();
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Component should not display FormInputError if input field is not dirty', () => {
    const error = getComponent<FormInputError>(fixture, FormInputError);

    expect(error).toBeFalsy();
  });

  it('U-Test-3: Component should display email address from the input signal', () => {
    const input = getHTMLElement<HTMLInputElement>(fixture, '#email')!;

    expect(input.value).toBe(email);
  });

  it('U-Test-4: Component should display FormInputError if email address is invalid', async () => {
    const input = getHTMLElement<HTMLInputElement>(fixture, '#email')!;
    input.value = 'Test';
    setInputValues([input!]);
    await fixture.whenStable();

    const error = getComponent<FormInputError>(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-5: Component should not emit an invalid email-address', async () => {
    spyOn(component.send, 'emit');
    const input = getHTMLElement<HTMLInputElement>(fixture, '#email')!;
    input.value = 'Test';
    setInputValues([input!]);
    await fixture.whenStable();

    expect(component.send.emit).not.toHaveBeenCalled();
  });

  it('U-Test-6: Component should emit a valid email-address', async () => {
    spyOn(component.send, 'emit');
    const button = getHTMLElement<HTMLButtonElement>(
      fixture,
      '#send-code-button'
    )!;
    button.click();
    await fixture.whenStable();

    expect(component.send.emit).toHaveBeenCalled();
  });

  it('U-Test-7: Component should emit a email-address when button is clicked', async () => {
    spyOn(component.send, 'emit');
    const button = getHTMLElement<HTMLButtonElement>(
      fixture,
      '#send-code-button'
    )!;
    button.click();
    await fixture.whenStable();

    expect(component.send.emit).toHaveBeenCalledWith(email);
  });
});
