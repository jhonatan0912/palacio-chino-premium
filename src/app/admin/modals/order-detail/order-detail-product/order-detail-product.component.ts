import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ImageBrokenDirective } from '@shared/directives/imageBroken.directive';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { GetOrdersResponseProductDto } from 'pc-proxies';

@Component({
  selector: 'admin-order-detail-product',
  standalone: true,
  imports: [SrcImagePipe, DecimalPipe, ImageBrokenDirective],
  templateUrl: './order-detail-product.component.html',
  styleUrls: ['./order-detail-product.component.scss']
})
export class AdminOrderDetailProductComponent {

  product = input.required<GetOrdersResponseProductDto>();
}
