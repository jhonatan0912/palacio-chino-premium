import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewComponent } from '@core/view-component';
import { IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { OrdersService } from '@profile/services/orders.service';
import { AddressDto, CreateOrderDto, DeliveryType, OrdersProxy, PaymentMethod } from '@shared/proxies';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { finalize } from 'rxjs';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryTypeComponent } from './checkout-delivery-type/checkout-delivery-type.component';
import { AsideComponent } from './components/aside/aside.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [IonSpinner, RouterOutlet, AsideComponent, CheckoutAddressComponent, CheckoutDeliveryTypeComponent, ButtonComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends ViewComponent {

  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _ordersService = inject(OrdersService);
  private readonly _shoppingCartService = inject(ShoppingCartService);

  deliveryType: DeliveryType = 'delivery';
  paymentMethod: PaymentMethod | null = null;

  busy: boolean = false;
  address: AddressDto = new AddressDto({
    id: '',
    district: '',
    type: '',
    street: '',
    number: '',
    phone: '',
    reference: '',
  });

  constructor() {
    super();
  }

  onConfirm(): void {
    if (!this.address.id) return;

    const orders = this._shoppingCartService.cart()
      .map(product => ({
        id: product.id,
        quantity: product.quantity,
      }) as CreateOrderDto);

    this.busy = true;
    this._ordersProxy.create(
      orders,
      this.address.id,
      this.deliveryType,
      this.paymentMethod
    ).pipe(finalize(() => this.busy = false))
      .subscribe({
        next: (res) => {
          this._ordersService.orders.update((prev) => [res, ...prev]);
          this.navigation.forward('/profile/orders');
          this._shoppingCartService.clear();
        }
      });
  }
}
