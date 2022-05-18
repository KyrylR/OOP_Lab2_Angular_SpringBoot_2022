import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {DriverService} from "../services/driver.service";
import {Driver} from "../interface/driver";

export class CustomValidators {

  // whitespace validation
  static notOnlyWhitespace(control: FormControl) : ValidationErrors | null {

    // check if string only contains whitespace
    if ((control.value != null) && (control.value.trim().length === 0)) {

      // invalid, return error object
      return { 'notOnlyWhitespace': true };
    }
    else {
      // valid, return null
      return null;
    }
  }
}

export function unique(drivers: Driver[]): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value != null && drivers.some(e => e.name === control.value)) {
      console.log("Not unique");
      return { 'unique': true }
    }
    console.log("Unique");
    return null;
  }

}
