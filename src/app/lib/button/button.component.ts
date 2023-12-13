import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() backgroundColor: string = '';
  @Input() title: string = '';

  @Output() onAction: EventEmitter<void> = new EventEmitter<void>();


  get background(): string {
    return this.type === 'fill'
      ? this.backgroundColor
      : '';
  }
}
