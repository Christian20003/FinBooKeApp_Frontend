import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { LoginComponent } from './login';
import { IconService, TestLoginDTO } from 'src/app/core';
import { FormInputErrorComponent } from 'src/app/shared/index';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { getComponent } from 'src/app/testing/helper/get-component';
import { setInputValues } from 'src/app/testing/helper/set-input-values';
import { getTranslocoModule } from 'src/app/shared/localization/transloco-testing';

describe('LoginComponent - Unit Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        MockComponent(FormInputErrorComponent),
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    emailInput = getHTMLElement<HTMLInputElement>(fixture, '#email')!;
    passwordInput = getHTMLElement<HTMLInputElement>(fixture, '#password')!;
    submitButton = getHTMLElement<HTMLButtonElement>(fixture, '#login-button')!;
  });

  it('U-Test-1: Component should exist', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Component should display FormInputErrorComponent if email is empty', () => {
    emailInput.value = '';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    fixture.detectChanges();

    const error = getComponent(fixture, FormInputErrorComponent);

    expect(error).toBeTruthy();
  });

  it('U-Test-3: Component should display FormInputErrorComponent if email is invalid', () => {
    emailInput.value = 'testest.de';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    fixture.detectChanges();

    const error = getComponent(fixture, FormInputErrorComponent);

    expect(error).toBeTruthy();
  });

  it('U-Test-3: Component should display FormInputErrorComponent if password is empty', () => {
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = '';
    setInputValues([emailInput, passwordInput]);
    fixture.detectChanges();

    const error = getComponent(fixture, FormInputErrorComponent);

    expect(error).toBeTruthy();
  });

  it('U-Test-4: Component should not display FormInputErrorComponent if form is valid', () => {
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    fixture.detectChanges();

    const error = getComponent(fixture, FormInputErrorComponent);

    expect(error).toBeFalsy();
  });

  it('U-Test-5: Component should not emit login data if email is empty', () => {
    spyOn(component.login, 'emit');
    emailInput.value = '';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    submitButton.click();
    fixture.detectChanges();

    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('U-Test-6: Component should not emit login data if email is invalid', () => {
    spyOn(component.login, 'emit');
    emailInput.value = 'testest.de';
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    submitButton.click();
    fixture.detectChanges();

    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('U-Test-7: Component should not emit login data if password is empty', () => {
    spyOn(component.login, 'emit');
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = '';
    setInputValues([emailInput, passwordInput]);
    submitButton.click();
    fixture.detectChanges();

    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('U-Test-11: Component should emit login data if form is valid', () => {
    spyOn(component.login, 'emit');
    emailInput.value = TestLoginDTO.email;
    passwordInput.value = TestLoginDTO.password;
    setInputValues([emailInput, passwordInput]);
    submitButton.click();
    fixture.detectChanges();

    expect(component.login.emit).toHaveBeenCalledWith(TestLoginDTO);
  });

  it('U-Test-12: Component should trigger empty emitter if forgot password link has been clicked', () => {
    const link = getHTMLElement<HTMLButtonElement>(fixture, '#forget-pwd');
    spyOn(component.forgotPwd, 'emit');
    link!.click();
    fixture.detectChanges();

    expect(component.forgotPwd.emit).toHaveBeenCalled();
  });
});
