import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { moveLeftToRight } from 'src/app/shared';

@Component({
  selector: 'app-get-code',
  templateUrl: './get-code.component.html',
  styleUrls: ['./get-code.component.scss'],
  animations: [moveLeftToRight],
  standalone: false,
})
export class GetCodeComponent implements OnInit {
  // Form to be able to enter an email address
  emailForm!: FormGroup;
  // The option to get an existing email address
  @Input() emailValue = '';
  // EventEmitter to send the email address to the parent component
  @Output() setEmail = new EventEmitter<string>();

  // All text labels for the HTML template
  text = {
    email: {
      label: 'Email-Adresse',
      missing: 'Bitte eine Email-Adresse angeben',
      invalid: 'Ungültige Email-Adresse',
    },
    sendCode: 'Code senden',
  };

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl(this.emailValue, [
        Validators.required,
        Validators.email,
      ]),
    });
    // Label will be moved if necessary
    if (this.emailValue !== '') {
      this.email?.markAsDirty();
    }
  }

  /**
   * This function returns the email value of the corresponding element in the form.
   * @returns The control object of email from the form
   */
  get email(): AbstractControl<string, string> | null {
    return this.emailForm.get('email');
  }
  /**
   * This function send the entered email address to the parent component. If the email is not valid then the event will not be triggered.
   * But the user will be notified with a specific error message.
   */
  onSubmit() {
    if (this.email?.valid) {
      this.setEmail.emit(this.email.value);
    }

    this.email?.markAsTouched();
    if (this.email?.invalid && !this.email.errors?.['email']) {
      this.email.setErrors({ required: true });
    }
  }
}
