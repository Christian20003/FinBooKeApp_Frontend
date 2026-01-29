import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { Login } from './login';
import { IconService } from 'src/app/core';
import { FormInputError, getTranslocoModule } from 'src/app/shared';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { getComponent } from 'src/app/testing/helper/get-component';
import { setInputValues } from 'src/app/testing/helper/set-input-values';
import { TestLoginDTO } from 'src/app/core/index.spec';

describe('Login - Unit Tests', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        Login,
        MockComponent(FormInputError),
        ReactiveFormsModule,
        getTranslocoModule(),
      ],
      providers: [
        provideZonelessChangeDetection(),
        {
          provider: IconService,
          useValue: jasmine.createSpyObj('IconService', ['registerIcons']),
        },
      ],
    });
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
    emailInput = getHTMLElement<HTMLInputElement>(fixture, '#email')!;
    passwordInput = getHTMLElement<HTMLInputElement>(fixture, '#password')!;
    submitButton = getHTMLElement<HTMLButtonElement>(fixture, '#login-button')!;
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Component should display FormInputError if email is empty', async () => {
    emailInput.value = '';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-3: Component should display FormInputError if email is invalid', async () => {
    emailInput.value = 'testest.de';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-3: Component should display FormInputError if password is empty', async () => {
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = '';
    setInputValues([emailInput, passwordInput]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-4: Component should not display FormInputError if form is valid', async () => {
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeFalsy();
  });

  it('U-Test-5: Component should not emit login data if email is empty', async () => {
    spyOn(component.login, 'emit');
    emailInput.value = '';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    submitButton.click();
    await fixture.whenStable();

    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('U-Test-6: Component should not emit login data if email is invalid', async () => {
    spyOn(component.login, 'emit');
    emailInput.value = 'testest.de';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    submitButton.click();
    await fixture.whenStable();

    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('U-Test-7: Component should not emit login data if password is empty', async () => {
    spyOn(component.login, 'emit');
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = '';
    setInputValues([emailInput, passwordInput]);
    submitButton.click();
    await fixture.whenStable();

    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('U-Test-11: Component should emit login data if form is valid', async () => {
    spyOn(component.login, 'emit');
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    submitButton.click();
    await fixture.whenStable();

    expect(component.login.emit).toHaveBeenCalledWith(TestLoginDTO);
  });

  it('U-Test-12: Component should trigger empty emitter if forgot password link has been clicked', async () => {
    const link = getHTMLElement<HTMLButtonElement>(fixture, '#forget-pwd');
    spyOn(component.forgotPwd, 'emit');
    link!.click();
    await fixture.whenStable();

    expect(component.forgotPwd.emit).toHaveBeenCalled();
  });
});
