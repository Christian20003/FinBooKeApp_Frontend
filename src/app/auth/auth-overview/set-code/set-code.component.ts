import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { moveLeftToRight } from 'src/app/shared';
import { securityCode } from '../../auth.interface';

@Component({
  selector: 'app-set-code',
  templateUrl: './set-code.component.html',
  styleUrls: ['./set-code.component.scss'],
  animations: [moveLeftToRight],
  standalone: false,
})
export class SetCodeComponent implements OnInit {
  // The formGroup which saves the user input with the code.
  codeForm!: FormGroup;
  // The eventEmitter which sends the entered code to the parent component
  @Output() sendCode = new EventEmitter<securityCode>();
  // Bool which identifies if a complete access code has been entered
  isInvalid = false;

  // The static text
  text = {
    proofCode: 'Code senden',
    missing: 'Bitte vollständigen Code eingeben',
  };

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
   * This function moves on to the next input element if the value of the current input element isn't falsy.
   *
   * @param currrent  - The current input element which received an input event
   * @param next      - The next input element which should be focused
   */
  toNext(current: HTMLInputElement, next: HTMLInputElement): void {
    if (current.value) {
      next.focus();
    }
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
   * @returns       If the {@link FormControl} exist, its saved value otherwise 0
   */
  private getValue(key: string): number {
    const control = this.codeForm.get(key);
    return control?.value ? control.value : 0;
  }
}
