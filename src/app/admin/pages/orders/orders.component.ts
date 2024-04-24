import { AdminOrdersService } from '@admin/services/orders.service';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminOrderItemComponent } from './order-item/order-item.component';
import { AdminProxy, OrderStatus } from 'pc-proxies';
import { AdminOrdersFilterComponent } from './orders-filter/orders-filter.component';
import { FilterOrdersPipe } from '@admin/pipes/filterOrders.pipe';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AdminOrderItemComponent, AdminOrdersFilterComponent, FilterOrdersPipe],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  private adminProxy = inject(AdminProxy);
  private destroyRef = inject(DestroyRef);

  adminOrdersService = inject(AdminOrdersService);
  status = signal<OrderStatus | 'all'>('all');

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.adminProxy.getOrders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.adminOrdersService.orders.set(res);
        }
      });
  }
}
