import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ViewComponent } from 'pc-core';
import { IonIcon } from "@ionic/angular/standalone";
import { AdminOrderDetailProductComponent } from './order-detail-product/order-detail-product.component';
import { OrderDetailStatusPopoverComponent } from './order-detail-status-popover/order-detail-status-popover.component';
import { TitleModalComponent } from '@shared/components/title-modal/title-modal.component';
import { OrderDetailClientComponent } from './order-detail-client/order-detail-client.component';
import { AdminGetOrderDto, AdminProxy, OrderStatus, formatOrderStatus } from 'pc-proxies';

@Component({
  selector: 'admin-order-detail',
  standalone: true,
  imports: [IonIcon, DecimalPipe, DatePipe, AdminOrderDetailProductComponent, TitleModalComponent, OrderDetailClientComponent],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class AdminOrderDetailComponent extends ViewComponent {

  private readonly _adminProxy = inject(AdminProxy);

  order = input.required<AdminGetOrderDto>();

  onChangeStatus(event: Event): void {
    if (this.order().status === 'canceled') return;

    this.popup.showWithData({
      component: OrderDetailStatusPopoverComponent,
      event: event,
      arrow: false
    }).then((status: OrderStatus) => {
      if (status === this.order().status) return;

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
