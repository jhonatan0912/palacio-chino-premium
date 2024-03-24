import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { AdminGetOrderDto, AdminProxy } from '@shared/proxies/admin.proxies';
import { AdminOrderDetailProductComponent } from './order-detail-product/order-detail-product.component';
import { ViewComponent } from '@core/view-component';
import { OrderStatus, OrdersProxy, formatOrderStatus } from '@shared/proxies/orders.proxie';
import { OrderDetailStatusPopoverComponent } from './order-detail-status-popover/order-detail-status-popover.component';

@Component({
  selector: 'admin-order-detail',
  standalone: true,
  imports: [IonIcon, DecimalPipe, DatePipe, AdminOrderDetailProductComponent],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class AdminOrderDetailComponent extends ViewComponent implements OnInit {

  private readonly _adminProxy = inject(AdminProxy);

  order = input.required<AdminGetOrderDto>();

  ngOnInit(): void {
    console.log(this.order());
  }

  onChangeStatus(event: Event): void {
    this.popup.showWithData({
      component: OrderDetailStatusPopoverComponent,
      event: event,
      arrow: false
    }).then((status: OrderStatus) => {
      this._adminProxy.changeOrderStatus(
        this.order().id,
        status
      ).subscribe({
        next: () => {
          this.order().status = status;
          this.order().formatedStatus = formatOrderStatus(status);
        }
      });
    });
  }
}
