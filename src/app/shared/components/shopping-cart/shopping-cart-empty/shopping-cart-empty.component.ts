import { Component } from '@angular/core';
import { ButtonComponent } from '@lib/button/button.component';
import { ViewComponent } from 'pc-core';

@Component({
  selector: 'shopping-cart-empty',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './shopping-cart-empty.component.html',
  styleUrls: ['./shopping-cart-empty.component.scss']
})
export class ShoppingCartEmptyComponent extends ViewComponent { }
