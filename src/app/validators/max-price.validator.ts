import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function maxPriceValidator(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isMax = control.value <= max;

    return isMax ? null : { maxPrice: true };
  };
}
