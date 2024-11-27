import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetCodeComponent } from 'src/app/auth/auth-overview/set-code/set-code.component';
import { InvalidInputComponent } from 'src/app/shared';
import {
  getComponent,
  getNativeElement,
  getNativeElements,
  triggerInput,
} from '../testing-support';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';

describe('SetCodeComponent - Unit Tests', () => {
  let component: SetCodeComponent;
  let fixture: ComponentFixture<SetCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetCodeComponent, InvalidInputComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule, MatIconModule],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(SetCodeComponent);
    component = fixture.componentInstance;
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
    expect(invalidComp.componentInstance.message()).toBe(
      component.text.missing
    );
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
    expect(invalidComp.componentInstance.message()).toBe(
      component.text.missing
    );
  });
});
