import { Component, inject } from '@angular/core';
import { RegisterForm } from './register.form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public readonly formService = inject(RegisterForm);
  public readonly form = this.formService.registerForm;

  // this shall be outsourced to shared
  public readonly text = {
    name: {
      label: 'Name',
      missing: 'Bitte einen Name angeben',
      invalid: 'Ungültiger Name',
    },
    email: {
      label: 'Email-Adresse',
      missing: 'Bitte eine Email-Adresse angeben',
      invalid: 'Ungültige Email-Adresse',
    },
    password: {
      label: 'Passwort',
      missing: 'Bitte ein Passwort eingeben',
      invalid: 'Ungültig Passwort, soll ein grßes Buchstabe und eine Sonderzeichen geben',
    }
  };

}
