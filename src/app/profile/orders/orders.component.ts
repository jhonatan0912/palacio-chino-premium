import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { OrderItemComponent } from './order-item/order-item.component';
import { GetOrderDto, OrdersProxy } from '@shared/proxies/orders.proxie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrdersService } from '@profile/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _ordersService = inject(OrdersService);
  private readonly _destroyRef = inject(DestroyRef);

  orders = signal<GetOrderDto[]>([]);

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

}
