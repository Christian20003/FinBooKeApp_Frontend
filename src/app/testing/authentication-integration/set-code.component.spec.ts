import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { SetCodeComponent } from 'src/app/auth/auth-overview/set-code/set-code.component';
import { InvalidInputComponent } from 'src/app/shared';
import {
  getComponent,
  getNativeElement,
  getNativeElements,
  triggerInput,
} from '../testing-support';
import { getTranslocoModule } from '../transloco-testing.module';

describe('SetCodeComponent - Unit Tests', () => {
  let fixture: ComponentFixture<SetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCodeComponent, InvalidInputComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        getTranslocoModule(),
      ],
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
    const invalidComp = getComponent<SetCodeComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
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
    const invalidComp = getComponent<SetCodeComponent, InvalidInputComponent>(
      fixture,
      InvalidInputComponent
    );
    expect(invalidComp.componentInstance.message())
      .withContext('Error message is not as defined')
      .toBe('Please enter the complete code');
  });
});
