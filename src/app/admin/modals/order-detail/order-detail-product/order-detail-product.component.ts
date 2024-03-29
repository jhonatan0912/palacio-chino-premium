import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { GetOrdersResponseProductDto } from '@shared/proxies/admin.proxies';

@Component({
  selector: 'admin-order-detail-product',
  standalone: true,
  imports: [SrcImagePipe, DecimalPipe],
  templateUrl: './order-detail-product.component.html',
  styleUrls: ['./order-detail-product.component.scss']
})
export class AdminOrderDetailProductComponent  {

  product = input.required<GetOrdersResponseProductDto>();
}
