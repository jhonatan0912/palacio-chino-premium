import { Component } from '@angular/core';
// import { MenuComponent } from '../menu/menu.component';
import { ProductCardComponent, ProductCardData } from '../shared/components/product-card/product-card.component';
import { ViewComponent } from '@core/view-component';


@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent extends ViewComponent {

  menuOptions = [
    { id: '1', icon: '/assets/img-promotion.svg', name: 'Promociones' },
    { id: '2', icon: '/assets/img-combos.svg', name: 'Combos' },
    { id: '3', icon: '/assets/img-sopas.svg', name: 'Sopas' },
    { id: '4', icon: '/assets/img-carta.svg', name: 'A la carta' },
    { id: '5', icon: 'https://cdn-icons-png.flaticon.com/128/6806/6806058.png', name: 'Banquetes' },
    { id: '6', icon: '/assets/img-bebida.svg', name: 'Bebidas' },
    { id: '7', icon: '/assets/img-postre.svg', name: 'Postres' },
  ];

  promotions: ProductCardData[] = [
    { id: '1', image: '', name: 'Promo 1', price: 100 },
    { id: '2', image: '', name: 'Promo 2', price: 200 },
    { id: '3', image: '', name: 'Promo 3', price: 300 },
    { id: '4', image: '', name: 'Promo 4', price: 400 },
    { id: '5', image: '', name: 'Promo 5', price: 500 },
    { id: '6', image: '', name: 'Promo 6', price: 500 },
    { id: '7', image: '', name: 'Promo 7', price: 500 },
    { id: '8', image: '', name: 'Promo 8', price: 500 },
    { id: '9', image: '', name: 'Promo 9', price: 500 },
  ];

  navigateToCategory(id: string): void {
    this.router.forward(`category/${id}`);
  }

}
