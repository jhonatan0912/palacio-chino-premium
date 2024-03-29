import { NgClass } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

export type ButtonType = 'fill' | 'outline' | 'link';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() type: ButtonType = 'fill';
  @Input() disabled: boolean = false;

  @Output() onAction: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class')
  protected get buttonType(): string {
    return `button-${this.type}`;
  }

  @HostListener('click')
  onClick() {
    this.onAction.emit();
  }
}
