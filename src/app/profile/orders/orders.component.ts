import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonIcon } from "@ionic/angular/standalone";
import { OrdersService } from '@profile/services/orders.service';
import { WebsocketsService } from '@profile/services/websockets.service';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { ViewComponent } from 'pc-core';
import { GetOrderDto, OrdersProxy } from 'pc-proxies';
import { OrderItemComponent } from './order-item/order-item.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [IonIcon, HeaderMobileComponent, OrderItemComponent],
  providers: [WebsocketsService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent extends ViewComponent implements OnInit {

  private readonly _ordersProxy = inject(OrdersProxy);
  private readonly _ordersService = inject(OrdersService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _websocketsService = inject(WebsocketsService);

  orders = signal<GetOrderDto[]>([]);

  constructor() {
    super();
    if (this.screen.screen === 'mobile') {
      this._websocketsService.init();
    }
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
          next: (response) => {
            this.orders.set(response.data);
            this._ordersService.orders.set(response.data);
            this._ordersService.loaded.set(true);
          }
        });
    }
  }

  onBack(): void {
    this.navigation.back('/profile');
  }

}
