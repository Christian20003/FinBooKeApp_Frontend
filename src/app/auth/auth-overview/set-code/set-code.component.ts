import { Component, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { moveLeftToRight } from 'src/app/shared';
import { SecurityCode } from '../../models/securityCode';

@Component({
  selector: 'app-set-code',
  templateUrl: './set-code.component.html',
  styleUrls: ['./set-code.component.scss'],
  animations: [moveLeftToRight],
  standalone: false,
})
export class SetCodeComponent implements OnInit {
  // The formGroup which saves the user input with the code.
  public codeForm!: FormGroup;
  // The output signal which sends the entered code to the parent component
  public readonly sendCode: OutputEmitterRef<SecurityCode> = output();
  // Bool which identifies if a complete access code has been entered
  public isInvalid = false;

  ngOnInit(): void {
    this.codeForm = new FormGroup({
      value1: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1),
      ]),
      value2: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1),
      ]),
      value3: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1),
      ]),
      value4: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1),
      ]),
      value5: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1),
      ]),
      value6: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1),
      ]),
    });
  }

  /**
   * This function validates the input of the code input element. If the value
   * is a lower case letter, it will be changed to an upper case letter. If the
   * value is not a letter `(A-Z)` or number `(0-9)`, it will be removed. After
   * recognizing a correct value it will switch to the next input element.
   *
   * @param currrent  - The current input element which received an `input` event
   * @param next      - The next input element which should be focused
   */
  validate(current: HTMLInputElement, next: HTMLInputElement): void {
    let value = current.value;
    const isLowerLetter = new RegExp('[a-z]');
    const isValid = new RegExp('[A-Z0-9]');
    if (isLowerLetter.test(value)) {
      value = value.toUpperCase();
      current.value = value;
    }
    if (isValid.test(value)) {
      next.focus();
    } else {
      current.value = '';
    }
    if (this.codeForm.valid) {
      this.isInvalid = false;
    }
  }

  /**
   * This function selects the complete content of the input element.
   *
   * @param current   - The current input element which received a `focus` event.
   */
  onFocus(current: HTMLInputElement): void {
    current.select();
  }

  /**
   * This function sends a message to the parent component with all 6 entered values of the form.
   * If the user does not completely fill out the form an error message will be displayed.
   */
  onSubmit(): void {
    if (this.codeForm.valid) {
      this.sendCode.emit({
        value1: this.getValue('value1'),
        value2: this.getValue('value2'),
        value3: this.getValue('value3'),
        value4: this.getValue('value4'),
        value5: this.getValue('value5'),
        value6: this.getValue('value6'),
      });
    } else {
      this.isInvalid = true;
    }
  }

  /**
   * This function returns the value from the {@link FormControl} with the corresponding key. If the entered
   * key does not exist in the {@link codeForm} it will return 0.
   *
   * @param key   - The key of the {@link FormControl} element
   * @returns       The stored value if the {@link FormControl} exist, otherwise 0
   */
  private getValue(key: string): string {
    const control = this.codeForm.get(key);
    return control?.value ? control.value : 0;
  }
}
