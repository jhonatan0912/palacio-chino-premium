import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ProductDto } from '@shared/proxies/products.proxie';

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

  product = input.required<ProductDto>();

  @Output() onOrder = new EventEmitter<ProductDto>();

}
