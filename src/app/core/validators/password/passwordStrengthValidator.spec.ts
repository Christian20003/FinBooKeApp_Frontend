import { FormControl, FormGroup } from '@angular/forms';
import { passwordStrengthValidator } from './passwordStrengthValidator';

describe('PasswordStrengthValidator - Unit Tests', () => {
  let form: FormGroup;

  const setPassword = function (value: string): void {
    const field = form.get('password');
    field?.setValue(value);
  };

  const getError = function (key: string): boolean | null {
    const field = form.get('password');
    return field?.errors?.[key];
  };

  beforeEach(() => {
    form = new FormGroup({
      password: new FormControl('', [passwordStrengthValidator(10)]),
    });
  });

  it('U-Test-1: Validator should return "upperCase" property when upper case letter is missing', () => {
    setPassword('abcdefg678');

    expect(getError('upperCase')).toBeTrue();
  });

  it('U-Test-2: Validator should return "lowerCase" property when lower case letter is missing', () => {
    setPassword('ABCDEFG678');

    expect(getError('lowerCase')).toBeTrue();
  });

  it('U-Test-3: Validator should return "digit" property when digit is missing', () => {
    setPassword('abcdefgHIJ');

    expect(getError('digit')).toBeTrue();
  });

  it('U-Test-4: Validator should return "chars" when there a less than 5 different characters', () => {
    setPassword('aaaaaabbB1111111');

    expect(getError('chars')).toBeTrue();
  });

  it('U-Test-5: Validator should not return any error when value is valid', () => {
    setPassword('abCDefgH66789');

    expect(form.valid).toBeTrue();
  });
});
