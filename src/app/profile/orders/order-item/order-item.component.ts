import { DatePipe } from '@angular/common';
import { Component, HostListener, input } from '@angular/core';
import { ViewComponent } from 'pc-core';
import { GetOrderDto } from 'pc-proxies';

@Component({
  selector: 'order-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent extends ViewComponent {

  order = input.required<GetOrderDto>();

  constructor() {
    super();
  }

  @HostListener('click')
  onClick() {
    this.navigation.forward(`/profile/order-detail/${this.order().id}`);
  }
}
