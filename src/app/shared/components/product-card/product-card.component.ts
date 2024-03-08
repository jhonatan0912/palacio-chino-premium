import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { ProductDto } from '@shared/proxies/products.proxie';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

export interface ProductCardData {
  id: string;
  image: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [DecimalPipe],
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
