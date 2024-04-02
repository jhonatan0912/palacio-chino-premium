import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[inputValidator]',
  standalone: true
})
export class InputValidatorDirective {

  @Input() inputType!: 'number' | 'phone' | 'email' | 'text';

  private readonly patterns = {
    number: /^[0-9]*$/,
    text: /^[a-zA-Z\s]*$/,
    phone: /^[0-9]*$/,
    email: /^[a-zA-Z0-9@.]*$/
  };

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const pattern = this.getPattern();
    const isValid = pattern.test(value);
    if (!isValid) {
      input.value = value.slice(0, -1);
    }
  }

  private getPattern(): RegExp {
    return this.patterns[this.inputType] || /^[a-zA-Z0-9\s]*$/;
  }
}
