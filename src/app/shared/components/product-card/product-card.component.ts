import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

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

  @Input() data!: ProductCardData;

}
