import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { FixedFooterComponent } from '@shared/components/fixed-footer/fixed-footer.component';
import { ProductDto } from '@shared/proxies';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { ShoppingCartEmptyComponent } from './shopping-cart-empty/shopping-cart-empty.component';
import { ShoppingCartProductComponent } from './shopping-cart-product/shopping-cart-product.component';

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
    this.navigation.back('/menu');
  }
}
