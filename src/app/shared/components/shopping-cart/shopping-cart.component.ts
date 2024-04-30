import { DecimalPipe, JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { IonIcon, PopoverController } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { ShoppingCartFooterComponent } from './shopping-cart-footer/shopping-cart-footer.component';
import { ShoppingCartProductComponent } from './shopping-cart-product/shopping-cart-product.component';
import { ShoppingCartEmptyComponent } from './shopping-cart-empty/shopping-cart-empty.component';
import { ViewComponent } from 'pc-core';
import { ProductDto } from 'pc-proxies';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [IonIcon, JsonPipe, ShoppingCartProductComponent, DecimalPipe, ButtonComponent, ShoppingCartFooterComponent, ShoppingCartEmptyComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends ViewComponent {

  private readonly _popoverCtrl = inject(PopoverController);
  private readonly _shoppingCartService = inject(ShoppingCartService);

  products = signal<ProductDto[]>([]);
  total = signal<number>(0);

  constructor() {
    super();
    effect(() => {
      this.products.set(this._shoppingCartService.cart());
      this.total.set(this.products().reduce((acc, product) => acc + (product.price! * product.quantity!), 0));
    }, { allowSignalWrites: true });
  }

  onDismiss(): void {
    this._popoverCtrl.dismiss('cancel');
  }

  onPay(): void {
    if (!this.session.user) {
      this._popoverCtrl.dismiss('cancel')
        .then(() => this.navigation.forward('/auth/login'));

    } else {
      this._popoverCtrl.dismiss('cancel')
        .then(() => this.navigation.forward('/checkout'));
    }
  }

}
