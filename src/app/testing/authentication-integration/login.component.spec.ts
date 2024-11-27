import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from 'src/app/auth/auth-overview/login/login.component';
import { InvalidInputComponent } from 'src/app/shared';
import {
  getComponent,
  getComponents,
  getNativeElement,
  triggerInput,
} from '../testing-support';

describe('LoginComponent - Integration Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, InvalidInputComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, MatIconModule],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('I-TEST-1: Validation of empty email with correct error message', () => {
    const errorMessage = 'Missing email';
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    component.text.email.missing = errorMessage;
    emailInput.value = '';
    triggerInput([emailInput]);
    fixture.detectChanges();

    const invalidComp = getComponent<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Missing email"'
      )
      .toBe(errorMessage);
  });

  it('I-TEST-2: Validation of invalid email with correct error message', () => {
    const errorMessage = 'Invalid email';
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    component.text.email.invalid = errorMessage;
    emailInput.value = 'wrongEmail.de';
    triggerInput([emailInput]);
    fixture.detectChanges();

    const invalidComp = getComponent<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Invalid email"'
      )
      .toBe(errorMessage);
  });

  it('I-TEST-3: Validation of empty password with correct error message', () => {
    const errorMessage = 'Missing password';
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    component.text.password.missing = errorMessage;
    passwordInput.value = '';
    triggerInput([passwordInput]);
    fixture.detectChanges();

    const invalidComp = getComponent<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Missing password"'
      )
      .toBe('Missing password');
  });

  it('I-TEST-4: Validation of error messages with empty email and empty password after clicking login', () => {
    const errorMessage1 = 'Missing password';
    const errorMessage2 = 'Missing email';
    const button = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    component.text.password.missing = errorMessage1;
    component.text.email.missing = errorMessage2;
    button.click();
    fixture.detectChanges();

    const invalidComp = getComponents<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp[0].componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Missing email"'
      )
      .toBe(errorMessage2);
    expect(invalidComp[1].componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Missing password"'
      )
      .toBe(errorMessage1);
  });

  it('I-TEST-5: Validation of error messages with incorrect email and empty password after clicking login', () => {
    const errorMessage1 = 'Missing password';
    const errorMessage2 = 'Invalid email';
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const button = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    component.text.password.missing = errorMessage1;
    component.text.email.invalid = errorMessage2;
    emailInput.value = 'Test';
    triggerInput([emailInput]);
    button.click();
    fixture.detectChanges();

    const invalidComp = getComponents<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp[0].componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Invalid email"'
      )
      .toBe(errorMessage2);
    expect(invalidComp[1].componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Missing password"'
      )
      .toBe(errorMessage1);
  });
});
