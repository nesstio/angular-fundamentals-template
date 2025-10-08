import { Directive } from "@angular/core";
import {NG_VALIDATORS, Validator, AbstractControl, ValidationErrors} from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
    },]
})
export class EmailValidatorDirective implements Validator{
    // Add your code here
    validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailPattern.test(value);

    return valid ? null : { invalidEmail: true };
  }
}
