import { DecimalPipe, SlicePipe } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { AdminGetOrderDto } from '@shared/proxies/admin.proxies';

@Component({
  selector: 'admin-order-item',
  standalone: true,
  imports: [DecimalPipe, SlicePipe],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class AdminOrderItemComponent implements OnInit {

  order = input.required<AdminGetOrderDto>();

  constructor() { }

  ngOnInit() {
  }

}
