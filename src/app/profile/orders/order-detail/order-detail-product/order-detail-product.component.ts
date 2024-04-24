import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ImageBrokenDirective } from '@shared/directives/imageBroken.directive';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { OrderDetailProductDto } from 'pc-proxies';

@Component({
  selector: 'order-detail-product',
  standalone: true,
  imports: [DecimalPipe, SrcImagePipe, ImageBrokenDirective],
  templateUrl: './order-detail-product.component.html',
  styleUrls: ['./order-detail-product.component.scss']
})
export class OrderDetailProductComponent {

  product = input.required<OrderDetailProductDto>();
}
