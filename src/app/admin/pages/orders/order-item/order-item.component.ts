import { AdminOrderDetailComponent } from '@admin/modals/order-detail/order-detail.component';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { AdminGetOrderDto } from '@shared/proxies';

@Component({
  selector: 'admin-order-item',
  standalone: true,
  imports: [DecimalPipe, SlicePipe, DatePipe],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class AdminOrderItemComponent extends ViewComponent {

  order = input.required<AdminGetOrderDto>();

  constructor() {
    super();
  }

  onAction(): void {
    this.dialog.showWithData({
      component: AdminOrderDetailComponent,
      componentProps: {
        order: this.order
      }
    });
  }
}
