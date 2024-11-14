import { FormControl } from "@angular/forms"

// Interface for registration form
export interface RegisterFormInterface {

    name: FormControl<string>; 

    email: FormControl<string>; 

    password:FormControl<string>;
}

