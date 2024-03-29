import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrdersService } from '@profile/services/orders.service';
import { GetOrderDto, OrdersProxy } from '@shared/proxies/orders.proxie';
import { OrderItemComponent } from './order-item/order-item.component';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { IonIcon } from "@ionic/angular/standalone";
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [IonIcon, HeaderMobileComponent, OrderItemComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent extends ViewComponent implements OnInit {

  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _ordersService = inject(OrdersService);
  private readonly _destroyRef = inject(DestroyRef);

  orders = signal<GetOrderDto[]>([]);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.onGetAll();
  }

  onGetAll(): void {
    if (this._ordersService.loaded()) {
      this.orders.set(this._ordersService.orders());
    } else {
      this._ordersProxy.getAll()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (orders) => {
            this.orders.set(orders);
            this._ordersService.orders.set(orders);
            this._ordersService.loaded.set(true);
          }
        });
    }
  }

  onBack(): void {
    this.navigation.back('/profile');
  }

}
