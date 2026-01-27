import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { provideZonelessChangeDetection } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { Register } from './register';
import { FormInputError, getTranslocoModule } from 'src/app/shared';
import { IconService, TestRegisterDTO } from 'src/app/core';
import { getHTMLElement } from 'src/app/testing/helper/get-html-element';
import { setInputValues } from 'src/app/testing/helper/set-input-values';
import {
  getComponent,
  getComponents,
} from 'src/app/testing/helper/get-component';

describe('Register - Unit Tests', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  let email: HTMLInputElement;
  let username: HTMLInputElement;
  let password: HTMLInputElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        Register,
        MockComponent(MatIcon),
        MockComponent(FormInputError),
        ReactiveFormsModule,
        getTranslocoModule(),
      ],
      providers: [
        provideZonelessChangeDetection(),
        {
          provider: IconService,
          useValue: jasmine.createSpyObj(IconService, ['registerIcons']),
        },
      ],
    });
    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();

    email = getHTMLElement(fixture, '#email')!;
    username = getHTMLElement(fixture, '#username')!;
    password = getHTMLElement(fixture, '#password')!;
    button = getHTMLElement(fixture, '#register-btn')!;
  });

  it('U-Test-1: Component should display error if email is empty', async () => {
    email.value = '';
    username.value = TestRegisterDTO.name;
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-2: Component should display error if email is invalid', async () => {
    email.value = 'test';
    username.value = TestRegisterDTO.name;
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-3: Component should display error if username is empty', async () => {
    email.value = TestRegisterDTO.email;
    username.value = '';
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-4: Component should display error if password is empty', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = '';
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-5: Component should display error if password does not contain lower case letter', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = 'DDEEFFGGHHII66';
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-5: Component should display error if password does not contain upper case letter', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = 'ddeeffgghhii66';
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-6: Component should display error if password does not contain digit', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = 'ddeeffgghhiiUU';
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-7: Component should display error if password does not contain 5 different character', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = '4444UUUUtttttzz';
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-8: Component should display error if password does not contain 10 character', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = '1wEr';
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeTruthy();
  });

  it('U-Test-9: Component should not display an error if email is valid', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeFalsy();
  });

  it('U-Test-10: Component should not display an error if username is valid', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeFalsy();
  });

  it('U-Test-11: Component should not display an error if password is valid', async () => {
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    const error = getComponent(fixture, FormInputError);

    expect(error).toBeFalsy();
  });

  it('U-Test-12: Component should not emit data if form is invalid', async () => {
    const spy = spyOn(component.register, 'emit');
    email.value = 'test';
    username.value = TestRegisterDTO.name;
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    button.click();
    await fixture.whenStable();

    expect(spy).not.toHaveBeenCalled();
  });

  it('U-Test-13: Component should display errors if email and username are empty after calling submit', async () => {
    email.value = '';
    username.value = '';
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    button.click();
    await fixture.whenStable();

    const errors = getComponents(fixture, FormInputError);

    expect(errors).toHaveSize(2);
  });

  it('U-Test-14: Component should emit data if form is valid', async () => {
    const spy = spyOn(component.register, 'emit');
    email.value = TestRegisterDTO.email;
    username.value = TestRegisterDTO.name;
    password.value = TestRegisterDTO.password;
    setInputValues([email, username, password]);
    await fixture.whenStable();

    button.click();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith(TestRegisterDTO);
  });
});
