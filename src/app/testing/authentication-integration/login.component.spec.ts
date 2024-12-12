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
import { getTranslocoModule } from '../transloco-testing.module';

describe('LoginComponent - Integration Tests', () => {
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, InvalidInputComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        getTranslocoModule(),
      ],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('I-TEST-1: Validation of empty email with correct error message', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = '';
    triggerInput([emailInput]);
    fixture.detectChanges();

    const invalidComp = getComponent<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Please enter an e-mail address"'
      )
      .toBe('Empty e-mail address');
  });

  it('I-TEST-2: Validation of invalid email with correct error message', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = 'wrongEmail.de';
    triggerInput([emailInput]);
    fixture.detectChanges();

    const invalidComp = getComponent<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Invalid e-mail address"'
      )
      .toBe('Invalid e-mail address');
  });

  it('I-TEST-3: Validation of empty password with correct error message', () => {
    const passwordInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#password'
    );
    passwordInput.value = '';
    triggerInput([passwordInput]);
    fixture.detectChanges();

    const invalidComp = getComponent<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Please enter a password"'
      )
      .toBe('Empty password');
  });

  it('I-TEST-4: Validation of error messages with empty email and empty password after clicking login', () => {
    const button = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
    button.click();
    fixture.detectChanges();

    const invalidComp = getComponents<LoginComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp[0].componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Please enter an e-mail address"'
      )
      .toBe('Empty e-mail address');
    expect(invalidComp[1].componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Please enter a password"'
      )
      .toBe('Empty password');
  });

  it('I-TEST-5: Validation of error messages with incorrect email and empty password after clicking login', () => {
    const emailInput = getNativeElement<LoginComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const button = getNativeElement<LoginComponent, HTMLButtonElement>(
      fixture,
      '#login-button'
    );
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
        'The displayed message of InvalidInputComponent should be "Invalid e-mail address"'
      )
      .toBe('Invalid e-mail address');
    expect(invalidComp[1].componentInstance.message())
      .withContext(
        'The displayed message of InvalidInputComponent should be "Please enter a password"'
      )
      .toBe('Empty password');
  });
});
