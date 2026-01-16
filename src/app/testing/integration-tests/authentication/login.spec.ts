import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoService } from '@jsverse/transloco';
import { LoginComponent } from 'src/app/authentication/login/login';
import {
  FormInputErrorComponent,
  getTranslocoModule,
  TRANSLATION_KEYS,
} from 'src/app/shared';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { IconService } from 'src/app/core';
import { setInputValues } from 'src/app/testing/helper/set-input-values';
import { TestLoginDTO } from 'src/app/core/models/authentication/loginDTO';
import { getComponent } from 'src/app/testing/helper/get-component';

describe('LoginComponent - Integration Tests', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let translocoService: TranslocoService;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        FormInputErrorComponent,
        ReactiveFormsModule,
        getTranslocoModule(),
        MatIconModule,
      ],
      providers: [
        provideHttpClient(),
        provideZonelessChangeDetection(),
        IconService,
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    translocoService = TestBed.inject(TranslocoService);
    fixture.detectChanges();
    emailInput = getHTMLElement(fixture, '#email')!;
    passwordInput = getHTMLElement(fixture, '#password')!;
  });

  it('I-Test-1: Component should display correct error message if email is empty', () => {
    emailInput.value = '';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    fixture.detectChanges();

    const error = getComponent(fixture, FormInputErrorComponent)!;
    const actual = error.message();
    const expected = translocoService.translate(
      TRANSLATION_KEYS.auth.email.missing
    );

    expect(actual).toBe(expected);
  });

  it('I-Test-2: Component should display correct error message if email is invalid', () => {
    emailInput.value = 'testtest.com';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    fixture.detectChanges();

    const error = getComponent(fixture, FormInputErrorComponent)!;
    const actual = error.message();
    const expected = translocoService.translate(
      TRANSLATION_KEYS.auth.email.invalid
    );

    expect(actual).toBe(expected);
  });

  it('I-Test-3: Component should display correct error message if password is empty', () => {
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = '';
    setInputValues([emailInput, passwordInput]);
    fixture.detectChanges();

    const error = getComponent(fixture, FormInputErrorComponent)!;
    const actual = error.message();
    const expected = translocoService.translate(
      TRANSLATION_KEYS.auth.password.missing
    );

    expect(actual).toBe(expected);
  });
});
