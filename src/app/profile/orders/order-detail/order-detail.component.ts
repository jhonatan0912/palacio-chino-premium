import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { WebsocketsService } from '@profile/services/websockets.service';
import { OrderDetailDto, OrdersProxy } from '@shared/proxies';
import { OrderDetailProductComponent } from './order-detail-product/order-detail-product.component';

@Component({
  selector: 'order-detail',
  standalone: true,
  imports: [OrderDetailProductComponent],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _websocketsService = inject(WebsocketsService);
  private readonly _destroyRef = inject(DestroyRef);

  order = signal<OrderDetailDto>(new OrderDetailDto());

  ngOnInit(): void {
    this._activatedRoute.params
      .subscribe(({ id }) => {
        this.onGetOrderDetail(id);
      });
  }

  onGetOrderDetail(id: string): void {
    this._ordersProxy.get(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (order) => {
          this.order.set(order);
          this._websocketsService.changeOrderDetailStatus(this.order());
        }
      });
  }
}
