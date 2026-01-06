import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { SetCodeComponent } from 'src/app/auth/auth-overview/set-code/set-code.component';
import { FormInputErrorComponent } from 'src/app/shared';
import {
  getComponent,
  getNativeElement,
  getNativeElements,
  triggerInput,
} from '../testing-support';

xdescribe('SetCodeComponent - Unit Tests', () => {
  let fixture: ComponentFixture<SetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCodeComponent, FormInputErrorComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, MatIconModule],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(SetCodeComponent);
    fixture.detectChanges();
  });

  it('I-Test-1: Clicking the submit button with empty code should display an error message', () => {
    const button = getNativeElement<SetCodeComponent, HTMLButtonElement>(
      fixture,
      '#proof-code-button'
    );
    button.click();
    fixture.detectChanges();
    const invalidComp = getComponent<SetCodeComponent, FormInputErrorComponent>(
      fixture,
      FormInputErrorComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext('Error message is not as defined')
      .toBe('Please enter the complete code');
  });

  it('I-Test-2: Clicking the submit button with invalid code should display an error message', () => {
    const button = getNativeElement<SetCodeComponent, HTMLButtonElement>(
      fixture,
      '#proof-code-button'
    );
    const codeInput = getNativeElements<SetCodeComponent, HTMLInputElement>(
      fixture,
      '.key-field'
    );
    codeInput[0].value = '1';
    codeInput[1].value = '2';
    triggerInput([codeInput[0], codeInput[1]]);
    button.click();
    fixture.detectChanges();
    const invalidComp = getComponent<SetCodeComponent, FormInputErrorComponent>(
      fixture,
      FormInputErrorComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext('Error message is not as defined')
      .toBe('Please enter the complete code');
  });
});
