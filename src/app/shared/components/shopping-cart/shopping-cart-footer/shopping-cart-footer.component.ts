import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Output, model } from '@angular/core';
import { ButtonComponent } from '@lib/button/button.component';

@Component({
  selector: 'shopping-cart-footer',
  standalone: true,
  imports: [DecimalPipe, ButtonComponent],
  templateUrl: './shopping-cart-footer.component.html',
  styleUrls: ['./shopping-cart-footer.component.scss']
})
export class ShoppingCartFooterComponent {
  
  total = model.required<number>();

  @Output() onPay = new EventEmitter<void>();
  @Output() onDismiss = new EventEmitter<void>();
}
