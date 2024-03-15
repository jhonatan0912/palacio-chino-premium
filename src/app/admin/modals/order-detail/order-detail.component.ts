import { Component, OnInit, input } from '@angular/core';
import { AdminGetOrderDto } from '@shared/proxies/admin.proxies';

@Component({
  selector: 'admin-order-detail',
  standalone: true,
  imports: [],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class AdminOrderDetailComponent implements OnInit {

  order = input.required<AdminGetOrderDto>();

  constructor() { }

  ngOnInit() {
    console.log(this.order());
  }

}
