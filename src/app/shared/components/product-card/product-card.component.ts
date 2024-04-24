import { DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ImageBrokenDirective } from '@shared/directives/imageBroken.directive';
import { SliceTextPipe } from '@shared/pipes/sliceText.pipe';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { ProductDto } from 'pc-proxies';

export interface ProductCardData {
  id: string;
  image: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe, SrcImagePipe, SliceTextPipe, ImageBrokenDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  private shoppingCartService = inject(ShoppingCartService);

  product = input.required<ProductDto>();

  onOrder(product: ProductDto): void {
    this.shoppingCartService.addToCart(product);
  }

}
