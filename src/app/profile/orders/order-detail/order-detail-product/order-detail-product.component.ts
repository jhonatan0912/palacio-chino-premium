import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { OrderDetailProductDto } from '@shared/proxies/orders.proxie';

@Component({
  selector: 'order-detail-product',
  standalone: true,
  imports: [DecimalPipe, SrcImagePipe],
  templateUrl: './order-detail-product.component.html',
  styleUrls: ['./order-detail-product.component.scss']
})
export class OrderDetailProductComponent  {

  product = input.required<OrderDetailProductDto>();
}
