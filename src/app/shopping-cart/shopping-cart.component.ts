import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { FixedFooterComponent } from '@shared/components';
import { ViewComponent } from 'pc-core';
import { ProductDto } from 'pc-proxies';
import { ShoppingCartEmptyComponent } from './shopping-cart-empty/shopping-cart-empty.component';
import { ShoppingCartProductComponent } from './shopping-cart-product/shopping-cart-product.component';
import { ShoppingCartService } from '@shared/services';

@Component({
  selector: 'shopping-cart',
  standalone: true,
  imports: [IonIcon, IonSpinner, ShoppingCartProductComponent, FixedFooterComponent, ButtonComponent, DecimalPipe, ShoppingCartEmptyComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends ViewComponent {

  private readonly _shoppingCartService = inject(ShoppingCartService);

  busy: boolean = false;
  products = signal<ProductDto[]>([]);
  total = computed<number>(() => this.products().reduce((acc, product) => acc + (product.price * product.quantity!), 0));

  constructor() {
    super();

    effect(() => {
      this.products.set(this._shoppingCartService.cart());
    }, { allowSignalWrites: true });
  }

  onCheckout(): void {
    if (!this.session.user) {
      return this.navigation.forward('/auth/login', { shoppingCart: true });
    } else {
      this.navigation.forward('/checkout', { backref: 'shopping-cart' });
    }
  }

  onBack(): void {
    this.navigation.back('/');
  }
}
