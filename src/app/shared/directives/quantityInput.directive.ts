import { Directive, EventEmitter, HostListener, Output, model } from '@angular/core';

@Directive({
  selector: '[quantityInput]',
  standalone: true
})
export class QuantityInputDirective {

  quantity = model.required<number>();

  @Output() onValueChange = new EventEmitter<void>();

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    const targetElement = event.target as HTMLInputElement;

    if (targetElement instanceof HTMLInputElement) {
      const value: number = +targetElement.value;

      if (value < 0) return;
      if (value === 0) this.quantity.set(1);

      this.quantity.set(value);
      this.onValueChange.emit();
    }
  }
}
