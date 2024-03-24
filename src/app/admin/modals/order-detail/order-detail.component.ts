import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { AdminGetOrderDto } from '@shared/proxies/admin.proxies';
import { AdminOrderDetailProductComponent } from './order-detail-product/order-detail-product.component';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'admin-order-detail',
  standalone: true,
  imports: [IonIcon, DecimalPipe, DatePipe, AdminOrderDetailProductComponent],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class AdminOrderDetailComponent extends ViewComponent implements OnInit {

  order = input.required<AdminGetOrderDto>();

  ngOnInit(): void {
    console.log(this.order());
  }
}
