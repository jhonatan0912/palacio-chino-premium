import { DecimalPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { OrdersService } from '@profile/services/orders.service';
import { FixedFooterComponent } from '@shared/components/fixed-footer/fixed-footer.component';
import { OrdersProxy, ProductDto } from '@shared/proxies';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { ShoppingCartAdressModalComponent } from './shopping-cart-adress-modal/shopping-cart-adress-modal.component';
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

  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _ordersService = inject(OrdersService);
  private readonly _shoppingCartService = inject(ShoppingCartService);

  busy: boolean = false;
  products = signal<ProductDto[]>([]);
  total = signal<number>(0);

  constructor() {
    super();

    effect(() => {
      this.products.set(this._shoppingCartService.cart());
      this.total.set(this.products().reduce((acc, product) => acc + (product.price * product.quantity!), 0));
    }, { allowSignalWrites: true });
  }

  onCheckout(): void {
    if (!this.session.user) {
      return this.navigation.forward('/auth/login', { shoppingCart: true });
    } else {
      this.onSelectAddress();
    }
  }

  onSelectAddress(): void {
    this.dialog.showWithData({
      component: ShoppingCartAdressModalComponent
    }).then((address) => {
      this.onOrder(address.id);
    });
  }

  onOrder(addressId: string): void {
    const orders = this.products().map(product => {
      return {
        id: product.id,
        quantity: product.quantity!
      } as CreateOrderDto;
    });
    this.busy = true;
    this._ordersProxy.create(
      orders,
      addressId
    ).pipe(finalize(() => this.busy = false))
      .subscribe({
        next: (res) => {
          this._ordersService.orders.update((prev) => [res, ...prev]);
          this.navigation.forward('/profile/orders');
          this._shoppingCartService.clear();
        }
      });
  }

  onBack(): void {
    this.navigation.back('/menu');
  }
}
