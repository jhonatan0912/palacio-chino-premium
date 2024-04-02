import { Component, input } from '@angular/core';
import { AdminGetOrderDto } from '@shared/proxies';

@Component({
  selector: 'order-detail-client',
  standalone: true,
  imports: [],
  templateUrl: './order-detail-client.component.html',
  styleUrls: ['./order-detail-client.component.scss']
})
export class OrderDetailClientComponent {

  order = input.required<AdminGetOrderDto>();
}
