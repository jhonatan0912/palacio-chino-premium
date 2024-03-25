import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { ButtonComponent } from '@lib/button/button.component';

@Component({
  selector: 'shopping-cart-empty',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './shopping-cart-empty.component.html',
  styleUrls: ['./shopping-cart-empty.component.scss']
})
export class ShoppingCartEmptyComponent extends ViewComponent { }
