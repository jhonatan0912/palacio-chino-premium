import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '@core/view-component';
import { IonRadioGroup, IonRadio, IonSpinner } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';
import { AddressesService } from '@profile/services/addresses.service';
import { OrdersService } from '@profile/services/orders.service';
import { AddressDto, AddressesProxy, CreateOrderDto, OrdersProxy } from '@shared/proxies';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-choose-address',
  standalone: true,
  imports: [IonSpinner, IonRadio, FormsModule, IonRadioGroup, ButtonComponent],
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.scss']
})
export class ChooseAddressComponent extends ViewComponent implements OnInit {

  private readonly _addressesProxy = inject(AddressesProxy);
  private readonly _addressesService = inject(AddressesService);
  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _ordersService = inject(OrdersService);
  private readonly _shoppingCartService = inject(ShoppingCartService);
  private readonly _destroyRef = inject(DestroyRef);

  busy: boolean = false;
  createOrderBusy: boolean = false;
  addresses = signal<AddressDto[]>([]);
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

  ngOnInit() {
    this.onGetAddresses();
  }

  onGetAddresses(): void {
    if (this._addressesService.loaded()) {
      this.addresses.set(this._addressesService.addresses());
    } else {
      this.busy = true;
      this._addressesProxy.getAll()
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.busy = false)
        )
        .subscribe({
          next: (addresses) => {
            this.addresses.set(addresses);
            this._addressesService.loaded.set(true);
            this._addressesService.addresses.set(addresses);
          }
        });
    }
  }

  onSelect(address: AddressDto): void {
    this.address = address;
  }

  onAddAddress(): void { }

  onContinue(): void {
    if (!this.address.id) return;

    const orders = this._shoppingCartService.cart()
      .map(p => ({
        id: p.id,
        quantity: p.quantity
      } as CreateOrderDto));

    this.createOrderBusy = true;
    this._ordersProxy.create(
      orders,
      this.address.id
    ).pipe(finalize(() => this.createOrderBusy = false))
      .subscribe({
        next: (res) => {
          this._ordersService.orders.update((prev) => [res, ...prev]);
          this.navigation.forward('/profile/orders');
          this._shoppingCartService.clear();
        }
      });
  }
}
