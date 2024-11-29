import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { GetCodeComponent } from './get-code.component';
import { MockComponent } from 'ng-mocks';
import { InvalidInputComponent } from 'src/app/shared';
import {
  triggerInput,
  getNativeElement,
} from 'src/app/testing/testing-support';

describe('GetCodeComponent - Unit Tests', () => {
  let component: GetCodeComponent;
  let fixture: ComponentFixture<GetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetCodeComponent, MockComponent(InvalidInputComponent)],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, MatIconModule],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(GetCodeComponent);
    fixture.componentRef.setInput('emailValue', '');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).withContext('GetCodeComponent should exist').toBeTruthy();
  });

  it('U-Test-2: Initial value of email address should be empty', () => {
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    expect(emailInput.value)
      .withContext('Value in template-form should be empty')
      .toBe('');
    expect(component.email?.value)
      .withContext('Value in the FormControl of email should not exist')
      .toBeFalsy();
  });

  it('U-Test-3: Initial empty email address should not have an error message', () => {
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(invalidComp)
      .withContext('InvalidInputComponent should not exist')
      .toBeFalsy();
  });

  it('U-Test-4: Getting an email address via input signal should set it as default value', () => {
    fixture = TestBed.createComponent(GetCodeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('emailValue', 'test@test.com');
    fixture.detectChanges();
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    expect(emailInput.value)
      .withContext('Value of email input-element should be that string')
      .toBe('test@test.com');
    expect(component.email?.value)
      .withContext('Value of email in the FormGroup should be that string')
      .toBe('test@test.com');
  });

  it('U-Test-5: Clicking on "send-code" button with initial empty email address should create an error message component', () => {
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    button.click();
    fixture.detectChanges();
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(invalidComp)
      .withContext('InvalidInputComponent should appear')
      .toBeTruthy();
  });

  it('U-Test-6: Entering an invalid email address should create an error message', () => {
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    emailInput.value = 'Test';
    triggerInput([emailInput]);
    fixture.detectChanges();
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(invalidComp)
      .withContext('InvalidInputComponent should appear')
      .toBeTruthy();
  });

  it('U-Test-7: Entering an invalid email address and clicking the "send-code" button should not trigger an EventEmitter', () => {
    spyOn(component.setEmail, 'emit');
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    emailInput.value = 'Test';
    triggerInput([emailInput]);
    button.click();
    fixture.detectChanges();
    expect(component.setEmail.emit)
      .withContext('Invalid email should not be emitted')
      .not.toHaveBeenCalled();
  });

  it('U-Test-8: Clicking the "send-code" button with valid email address should trigger an EventEmitter', () => {
    spyOn(component.setEmail, 'emit');
    const emailInput = getNativeElement<GetCodeComponent, HTMLInputElement>(
      fixture,
      '#email'
    );
    const button = getNativeElement<GetCodeComponent, HTMLButtonElement>(
      fixture,
      '#send-code-button'
    );
    emailInput.value = 'test@test.com';
    triggerInput([emailInput]);
    button.click();
    fixture.detectChanges();
    const invalidComp = getNativeElement<
      GetCodeComponent,
      InvalidInputComponent
    >(fixture, 'app-invalid-input');
    expect(component.setEmail.emit)
      .withContext('Valid email should be emitted')
      .toHaveBeenCalled();
    expect(component.setEmail.emit)
      .withContext('Emitted email should be that string')
      .toHaveBeenCalledWith('test@test.com');
    expect(invalidComp)
      .withContext('InvalidInputComponent should not appear')
      .toBeFalsy();
  });
});
