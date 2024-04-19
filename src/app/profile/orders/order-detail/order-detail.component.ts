import { NgClass } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { WebsocketsService } from '@profile/services/websockets.service';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { ViewComponent } from 'pc-core';
import { OrderDetailDto, OrdersProxy } from 'pc-proxies';
import { OrderDetailProductComponent } from './order-detail-product/order-detail-product.component';

@Component({
  selector: 'order-detail',
  standalone: true,
  imports: [NgClass, OrderDetailProductComponent, HeaderMobileComponent, IonIcon],
  providers: [WebsocketsService],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent extends ViewComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _websocketsService = inject(WebsocketsService);
  private readonly _destroyRef = inject(DestroyRef);

  order = signal<OrderDetailDto>(new OrderDetailDto());

  constructor() {
    super();
  }

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

  onBack(): void {
    this.navigation.forward('/profile/orders');
  }
}
