import { Component } from '@angular/core';
import { ProductCardComponent, ProductCardData } from '../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  menuOptions = [
    { icon: '', name: 'Promociones' },
    { icon: '', name: 'Combos' },
    { icon: '', name: 'Sopas' },
    { icon: '', name: 'A la carta' },
    { icon: '', name: 'Banquetes' },
    { icon: '', name: 'Bebidas' },
    { icon: '', name: 'Postres' },
  ];

  // TEMP
  promotions: ProductCardData[] = [
    { id: '1', image: '', name: 'Promo 1', price: 100 },
    { id: '2', image: '', name: 'Promo 2', price: 200 },
    { id: '3', image: '', name: 'Promo 3', price: 300 },
    { id: '4', image: '', name: 'Promo 4', price: 400 },
    { id: '5', image: '', name: 'Promo 5', price: 500 },
  ];

  // TEMP
  onDemandItems: ProductCardData[] = [
    { id: '1', image: '', name: 'Item 1', price: 100 },
    { id: '2', image: '', name: 'Item 2', price: 200 },
    { id: '3', image: '', name: 'Item 3', price: 300 },
    { id: '4', image: '', name: 'Item 4', price: 400 },
    { id: '5', image: '', name: 'Item 5', price: 500 },
    { id: '6', image: '', name: 'Item 6', price: 500 },
    { id: '7', image: '', name: 'Item 7', price: 500 },
    { id: '8', image: '', name: 'Item 8', price: 500 },
    { id: '9', image: '', name: 'Item 9', price: 500 },
    { id: '10', image: '', name: 'Item 10', price: 500 },
  ];
}
