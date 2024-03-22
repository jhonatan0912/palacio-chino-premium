import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '@lib/button/button.component';

@Component({
  selector: 'shopping-cart-empty',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './shopping-cart-empty.component.html',
  styleUrls: ['./shopping-cart-empty.component.scss']
})
export class ShoppingCartEmptyComponent {

  onDismiss = new EventEmitter<void>();

}
