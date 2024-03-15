import { Component } from '@angular/core';
import { OrderItemComponent } from './order-item/order-item.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
