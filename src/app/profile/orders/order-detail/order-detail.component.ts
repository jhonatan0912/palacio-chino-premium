import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { WebsocketsService } from '@profile/services/websockets.service';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { ViewComponent } from 'pc-core';
import { OrderDetailDto, OrderStatus, OrdersProxy, formatOrderStatus } from 'pc-proxies';
import { OrderDetailProductComponent } from './order-detail-product/order-detail-product.component';
import { finalize } from 'rxjs';
import { OrdersService } from '@profile/services/orders.service';

@Component({
  selector: 'order-detail',
  standalone: true,
  imports: [IonSpinner, OrderDetailProductComponent, HeaderMobileComponent, IonIcon],
  providers: [WebsocketsService],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent extends ViewComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _ordersService = inject(OrdersService);
  private readonly _websocketsService = inject(WebsocketsService);
  private readonly _destroyRef = inject(DestroyRef);

  order = signal<OrderDetailDto>(new OrderDetailDto());
  busy: boolean = false;

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
          this._websocketsService.onChangeOrderDetailStatus(this.order());
        }
      });
  }

  onUpdateStatus(): void {
    const canceledStatus: OrderStatus = 'canceled';

    this.busy = true;
    this._ordersProxy.updateOrderStatus(
      this.order().id,
      canceledStatus
    ).pipe(
      takeUntilDestroyed(this._destroyRef),
      finalize(() => this.busy = false)
    ).subscribe({
      next: () => {
        this.order().status = canceledStatus;
        this.order().formatedStatus = formatOrderStatus(canceledStatus);
        const order = this._ordersService.orders().find(order => order.id === this.order().id);
        if (!order) return;

        order.status = canceledStatus;
        order.formatedStatus = formatOrderStatus(canceledStatus);
      }
    });
  }

  canChangeStatus(): boolean {
    return this.order().status === 'pending';
  }

  onBack(): void {
    this.navigation.forward('/profile/orders');
  }
}
