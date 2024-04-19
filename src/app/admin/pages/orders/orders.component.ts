import { AdminOrdersService } from '@admin/services/orders.service';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminOrderItemComponent } from './order-item/order-item.component';
import { AdminProxy } from 'pc-proxies';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [AdminOrderItemComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  private adminProxy = inject(AdminProxy);
  private destroyRef = inject(DestroyRef);

  adminOrdersService = inject(AdminOrdersService);

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
