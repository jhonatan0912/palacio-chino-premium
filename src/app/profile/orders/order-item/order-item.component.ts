import { DatePipe } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { GetOrderDto } from '@shared/proxies';

@Component({
  selector: 'order-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  order = input.required<GetOrderDto>();

  constructor() { }

  ngOnInit() {
  }

}
