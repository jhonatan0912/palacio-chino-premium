import { Component, input, output } from '@angular/core';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { ProductDto } from '@shared/proxies';

@Component({
  selector: 'admin-product-item',
  standalone: true,
  imports: [SrcImagePipe],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  product = input.required<ProductDto>();

  onEditImage = output<ProductDto>();
}
