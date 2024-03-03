import { Component, OnInit, input } from '@angular/core';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { ProductDto } from '@shared/proxies/products.proxie';

@Component({
  selector: 'shopping-cart-product',
  standalone: true,
  imports: [SrcImagePipe],
  templateUrl: './shopping-cart-product.component.html',
  styleUrls: ['./shopping-cart-product.component.scss']
})
export class ShoppingCartProductComponent implements OnInit {

  product = input.required<ProductDto>();

  constructor() { }

  ngOnInit() {
  }

}
