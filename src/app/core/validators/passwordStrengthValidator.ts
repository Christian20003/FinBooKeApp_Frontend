import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * This function returns a validation function for a form to check
 * if a password fulfills the following propeties:
 * - Password must contain a upper case letter.
 * - Password must contain a lower case letter.
 * - Password must contain a digit.
 * - Password must consist of `uniqueChars` different characters.
 *
 * @param unqiueChars How many unique characters should the password have.
 *
 * @returns A validation function that returns either `null` if the
 * password is valid, otherwise an error map with the following properties:
 * - `upperCase`
 * - `lowerCase`
 * - `digit`
 * - `chars`
 */
export function passwordStrengthValidator(unqiueChars: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /[0-9]/.test(value);

    const map = new Set<string>();
    for (const char of value) {
      map.add(char);
    }
    const hasUniqueChars = map.size >= unqiueChars;

    const valid = hasUpperCase && hasLowerCase && hasDigit && hasUniqueChars;

    const result: ValidationErrors = {};
    if (!hasUpperCase) {
      result['upperCase'] = true;
    }
    if (!hasLowerCase) {
      result['lowerCase'] = true;
    }
    if (!hasDigit) {
      result['digit'] = true;
    }
    if (!hasUniqueChars) {
      result['chars'] = true;
    }

    return valid ? null : result;
  };
}
