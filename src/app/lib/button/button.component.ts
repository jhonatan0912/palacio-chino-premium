import { NgClass } from '@angular/common';
import { Component, EventEmitter, Host, HostBinding, Input, Output } from '@angular/core';

export type ButtonType = 'fill' | 'outline' | 'link';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input()
  @HostBinding('class.fill')
  type: ButtonType = 'fill';

  @Output() onAction: EventEmitter<void> = new EventEmitter<void>();
}
