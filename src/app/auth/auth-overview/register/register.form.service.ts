import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterFormInterface } from "./resgister.form.interface";


@Injectable({
    providedIn: 'root'
})
export class RegisterForm {

    // borrow from https://medium.com/@ojiofor/angular-reactive-forms-strong-password-validation-8dbcce92eb6c
    public readonly StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

    public readonly registerForm = new FormGroup<RegisterFormInterface>({
        name: new FormControl<string>('', { validators: Validators.required, nonNullable: true, updateOn: 'blur' }),
        email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true, updateOn: 'blur' }),
        password: new FormControl<string>('', { validators: [Validators.required, Validators.pattern(this.StrongPasswordRegx)], nonNullable: true, updateOn: 'blur' }),
    }
    );
}