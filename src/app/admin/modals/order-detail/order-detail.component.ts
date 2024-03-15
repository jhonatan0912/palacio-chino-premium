import { Component, input } from '@angular/core';
import { AdminGetOrderDto } from '@shared/proxies/admin.proxies';

@Component({
  selector: 'admin-order-detail',
  standalone: true,
  imports: [],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class AdminOrderDetailComponent {

  order = input.required<AdminGetOrderDto>();

  constructor() { }
}
