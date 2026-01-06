import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { MockComponent } from 'ng-mocks';
import { LoginComponent } from './login.component';
import { FormInputErrorComponent } from 'src/app/shared/index';
import {
  getNativeElement,
  getNativeElements,
  triggerInput,
} from 'src/app/testing/testing-support';

xdescribe('LoginComponent - Unit Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, MockComponent(FormInputErrorComponent)],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, MatIconModule],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-TEST-1: Component should create', () => {
    expect(component)
      .withContext('LoginComponent should not be undefined')
      .toBeTruthy();
  });

  it('U-TEST-2: The number of input elements should equal the number of formControls', () => {
    const formElement = fixture.debugElement.query(By.css('#login-form'));
    const inputElements = formElement.queryAll(By.css('input'));
    const emailFormGroup = component.loginForm.get('email');
    const passwordFormGroup = component.loginForm.get('password');

    expect(inputElements.length)
      .withContext('Template should have 2 input elements')
      .toEqual(2);
    expect(emailFormGroup)
      .withContext('FormControl object for email should exist')
      .toBeTruthy();
    expect(passwordFormGroup)
      .withContext('FormControl object for password should exist')
      .toBeTruthy();
  });

  it('U-TEST-3: Initial values of the form', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    const form = component.loginForm;

    expect(form.value)
      .withContext('FormGroup data should have the following structure')
      .toEqual({ email: null, password: null });
    expect(emailInput.value)
      .withContext('Content in the email input element should be empty')
      .toEqual('');
    expect(passwordInput.value)
      .withContext('Content in the password input element should be empty')
      .toEqual('');
  });

  it('U-TEST-4: Validation of empty email before interaction', () => {
    const emailControl = component.loginForm.get('email');
    const invalidComp = getNativeElement<
      LoginComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');
    expect(invalidComp)
      .withContext(
        'FormInputErrorComponent should not appear of untouched email input element'
      )
      .toBeFalsy();
    expect(emailControl?.errors?.['required'])
      .withContext('Validator error "required" should exist')
      .toBeTruthy();
  });

  it('U-TEST-5: Validation of empty email after interaction', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = '';
    triggerInput([emailInput]);
    fixture.detectChanges();

    const emailControl = component.loginForm.get('email');
    const invalidComp = getNativeElement<
      LoginComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');
    expect(invalidComp)
      .withContext(
        'FormInputErrorComponent should appear after touching the email input element with false value'
      )
      .toBeTruthy();
    expect(emailControl?.errors?.['required'])
      .withContext(
        'Validator error "required" should exist after entering an empty string'
      )
      .toBeTruthy();
  });

  it('U-TEST-6: Validation of false email after interaction', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = 'wrongEmail.de';
    triggerInput([emailInput]);
    fixture.detectChanges();

    const emailControl = component.loginForm.get('email');
    const invalidComp = getNativeElement<
      LoginComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');
    expect(invalidComp)
      .withContext(
        'FormInputErrorComponent should appear after entering a invalid email value'
      )
      .toBeTruthy();
    expect(emailControl?.errors?.['email'])
      .withContext(
        'Validator error "email" should exist after entering a invalid email value'
      )
      .toBeTruthy();
  });

  it('U-TEST-7: Validation of empty password before interaction', () => {
    const emailFormGroup = component.loginForm.get('password');
    const invalidComp = getNativeElement<
      LoginComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');
    expect(invalidComp)
      .withContext(
        'FormInputErrorComponent should not appear of untouched password input element'
      )
      .toBeFalsy();
    expect(emailFormGroup?.errors?.['required'])
      .withContext('Validator error "required" should exist')
      .toBeTruthy();
  });

  it('U-TEST-8: Validation of empty password after interaction', () => {
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    passwordInput.value = '';
    triggerInput([passwordInput]);
    fixture.detectChanges();

    const passwordControl = component.loginForm.get('password');
    const invalidComp = getNativeElement<
      LoginComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');

    expect(invalidComp)
      .withContext(
        'FormInputErrorComponent should appear after touching the email input element with an empty value'
      )
      .toBeTruthy();
    expect(passwordControl?.errors?.['required'])
      .withContext(
        'Validator error "required" should exist after entering an empty string'
      )
      .toBeTruthy();
  });

  it('U-TEST-9: Validation of valid form', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'examplePassword';
    triggerInput([emailInput, passwordInput]);
    fixture.detectChanges();
    const invalidComp = getNativeElement<
      LoginComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');

    expect(component.loginForm.valid)
      .withContext('FormGroup should be valid if all values are correct')
      .toBeTruthy();
    expect(invalidComp)
      .withContext(
        'FormInputErrorComponent should not appear if all value are correct'
      )
      .toBeFalsy();
  });

  it('U-Test-10: Invalid form should not be submitted and errors should be displayed', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    const loginButton = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    emailInput.value = 'Test';
    passwordInput.value = '';
    triggerInput([emailInput, passwordInput]);
    spyOn(component.login, 'emit');
    loginButton.click();
    fixture.detectChanges();

    const invalidComp = getNativeElements<
      LoginComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');
    const length = invalidComp.length;
    expect(component.loginForm.invalid)
      .withContext('FormGroup should be invalid')
      .toBeTruthy();
    expect(component.login.emit)
      .withContext('Login data should not be sent to the parent')
      .not.toHaveBeenCalled();
    expect(length)
      .withContext(
        'There should be a FormInputErrorComponent for incorrect email and password'
      )
      .toEqual(2);
  });

  it('U-Test-11: Valid form should be submitted', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    const loginButton = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    emailInput.value = 'example@gmail.com';
    passwordInput.value = 'examplePassword';
    triggerInput([emailInput, passwordInput]);
    spyOn(component.login, 'emit');
    loginButton.click();
    fixture.detectChanges();

    const invalidComp = getNativeElement<
      LoginComponent,
      FormInputErrorComponent
    >(fixture, 'app-form-input-error');
    expect(component.loginForm.valid)
      .withContext('FormGroup should be valid')
      .toBeTruthy();
    expect(component.login.emit)
      .withContext('Login data should be sent to the parent')
      .toHaveBeenCalled();
    expect(invalidComp)
      .withContext(
        'There should not any FormInputErrorComponent in correct submission'
      )
      .toBeFalsy();
  });

  it('U-Test-12: The forgetPwd emitter should be triggerd if the forget password button will be clicked', () => {
    const forgetPwd = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#forget-pwd'
    );
    spyOn(component.forgetPwd, 'emit');
    forgetPwd.click();
    fixture.detectChanges();

    expect(component.forgetPwd.emit)
      .withContext('The emit function of forgetPwd should be called')
      .toHaveBeenCalled();
  });
});
