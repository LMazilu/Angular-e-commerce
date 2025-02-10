import { Directive, Host, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumeric]',
})
export class NumericDirective {
  @HostBinding('class') currentClass = '';

  constructor() { }

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0); // Get the ASCII value of the key that the user pressed
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.currentClass = 'invalid';
      event.preventDefault();
    }
    else {
      this.currentClass = 'valid';
    }

  }
}
