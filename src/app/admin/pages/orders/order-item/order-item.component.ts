import { AdminOrderDetailComponent } from '@admin/modals/order-detail/order-detail.component';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ViewComponent } from 'pc-core';
import { AdminGetOrderDto } from 'pc-proxies';

@Component({
  selector: 'admin-order-item',
  standalone: true,
  imports: [DecimalPipe, SlicePipe, DatePipe],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class AdminOrderItemComponent extends ViewComponent {

  order = input.required<AdminGetOrderDto>();



  onAction(): void {
    this.dialog.showWithData({
      component: AdminOrderDetailComponent,
      componentProps: {
        order: this.order
      }
    });
  }
}
