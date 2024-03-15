import { AdminOrderDetailComponent } from '@admin/modals/order-detail/order-detail.component';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { CustomDatePipe } from '@shared/pipes/date.pipe';
import { AdminGetOrderDto } from '@shared/proxies/admin.proxies';

@Component({
  selector: 'admin-order-item',
  standalone: true,
  imports: [DecimalPipe, SlicePipe, DatePipe],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class AdminOrderItemComponent extends ViewComponent implements OnInit {

  order = input.required<AdminGetOrderDto>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.order());
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
