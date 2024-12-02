import {
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { moveLeftToRight } from 'src/app/shared';

@Component({
  selector: 'app-get-code',
  templateUrl: './get-code.component.html',
  styleUrls: ['./get-code.component.scss'],
  animations: [moveLeftToRight],
  standalone: false,
})
export class GetCodeComponent implements OnInit {
  // The option to get an existing email address
  public readonly emailValue: InputSignal<string> = input('');
  // EventEmitter to send the email address to the parent component
  public setEmail: OutputEmitterRef<string> = output();
  // Form to be able to enter an email address
  public emailForm!: FormGroup;

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'email',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/email.svg'
      )
    );
  }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl(this.emailValue(), [
        Validators.required,
        Validators.email,
      ]),
    });
    // Label will be moved if necessary
    if (this.emailValue() !== '') {
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
