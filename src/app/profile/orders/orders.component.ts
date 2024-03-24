import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { OrderItemComponent } from './order-item/order-item.component';
import { GetOrderDto, OrdersProxy } from '@shared/proxies/orders.proxie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _destroyRef = inject(DestroyRef);

  orders = signal<GetOrderDto[]>([]);

  ngOnInit(): void {
    this.onGetAll();
  }

  onGetAll(): void {
    this._ordersProxy.getAll()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (orders) => {
          this.orders.set(orders)
        }
      });
  }

}
