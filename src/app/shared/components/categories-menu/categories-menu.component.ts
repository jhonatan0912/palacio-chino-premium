import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'categories-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
})
export class CategoriesMenuComponent extends ViewComponent {

  @Input() selectedId!: string;

  menuOptions = [
    { id: '1', icon: '/assets/img-promotion.svg', name: 'Promociones' },
    { id: '2', icon: '/assets/img-combos.svg', name: 'Combos' },
    { id: '3', icon: '/assets/img-sopas.svg', name: 'Sopas' },
    { id: '4', icon: '/assets/img-carta.svg', name: 'A la carta' },
    { id: '5', icon: 'https://cdn-icons-png.flaticon.com/128/6806/6806058.png', name: 'Banquetes' },
    { id: '6', icon: '/assets/img-bebida.svg', name: 'Bebidas' },
    { id: '7', icon: '/assets/img-postre.svg', name: 'Postres' },
  ];

  constructor() {
    super();
    this.selectedId = this.menuOptions[0].id;
  }

  navigateToCategory(id: string): void {
    this.navigation.forward(`category/${id}`);
  }

}
