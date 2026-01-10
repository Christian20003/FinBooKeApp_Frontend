import { Component, ElementRef, inject, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { FormInputErrorComponent, TRANSLATION_KEYS } from 'src/app/shared';

/**
 * This component allows the user to enter an access code consisting of
 * multiple single-character input fields. It provides functionality for
 * input validation, navigation between fields, and submission of the code.
 */
@Component({
  selector: 'app-set-access-code',
  templateUrl: './set-access-code.html',
  styleUrls: ['./set-access-code.scss'],
  imports: [TranslocoDirective, ReactiveFormsModule, FormInputErrorComponent],
})
export class SetAccessCodeComponent implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly size = 6;

  protected isValid: boolean = true;
  protected form!: FormGroup;
  protected readonly translationKeys = TRANSLATION_KEYS;

  readonly send = output<string>();

  ngOnInit(): void {
    const group: { [key: string]: FormControl } = {};

    for (let i = 0; i < this.size; i++) {
      const key = this.getKey(i);
      group[key] = new FormControl(null, [
        Validators.required,
        Validators.maxLength(1),
      ]);
    }

    this.form = new FormGroup(group);
  }

  /**
   * This function validates the input of the code input element. If the value
   * is a lower case letter, it will be changed to an upper case letter. If the
   * value is not a letter `(A-Z)` or number `(0-9)`, it will be removed. After
   * recognizing a correct value it will switch to the next input element if
   * it exist.
   *
   * @param index The index of the `input` element which received an `input` event.
   */
  onInput(index: number): void {
    const element = this.elementRef.nativeElement.querySelector(
      `#${this.getKey(index)}`
    );
    const nextElement = this.elementRef.nativeElement.querySelector(
      `#${this.getKey(index + 1)}`
    );
    const isLowerLetter = new RegExp('[a-z]');
    const isValid = new RegExp('[A-Z0-9]');
    if (isLowerLetter.test(element.value)) {
      element.value = element.value.toUpperCase();
    }
    if (!isValid.test(element.value)) {
      element.value = '';
    } else if (nextElement !== null) {
      nextElement.focus();
    }
  }

  /**
   * This function validates a pressed key. If a key is pressed to delete
   * the content, it will move to the previous `input` element if it exist.
   *
   * @param event The {@link KeyboardEvent} that has been triggered.
   * @param index The index of the `input` element.
   */
  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const element = this.elementRef.nativeElement.querySelector(
        `#${this.getKey(index)}`
      );
      const prev = this.elementRef.nativeElement.querySelector(
        `#${this.getKey(index - 1)}`
      );
      if (prev !== null) {
        element.value = '';
        prev.focus();
      }
    }
  }

  /**
   * This function selects the complete content of the input element.
   *
   * @param current The index of the `input` element.
   */
  onFocus(index: number): void {
    const key = this.getKey(index);
    const element = this.elementRef.nativeElement.querySelector(`#${key}`);
    element.select();
  }

  /**
   * This function sends a message to the parent component with all entered values of the form.
   * If the user does not completely fill out the form an error message will be displayed.
   */
  onSubmit(): void {
    if (this.form.valid) {
      this.isValid = true;
      let code = '';
      for (let i = 0; i < this.size; i++) {
        const key = this.getKey(i);
        code += this.form.get(key)?.value;
      }
      this.send.emit(code);
    } else {
      this.isValid = false;
    }
  }

  /**
   * This function returns the key of a specific `input` element.
   *
   * @param idx The index of the `input` element.
   * @returns The corresponding key.
   */
  getKey(idx: number): string {
    return `value${idx + 1}`;
  }

  /**
   * This function returns a list of all `input` element keys.
   */
  getKeys(): Array<string> {
    return Array.from({ length: this.size }, (_, idx) => this.getKey(idx));
  }
}
