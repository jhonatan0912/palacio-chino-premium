import { Component, inject } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from '@ionic/angular/standalone';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';


interface HeaderOption {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent extends ViewComponent {

  options: HeaderOption[] = [
    { name: 'PROMOCIONES', path: 'category/1' },
    { name: 'LOCAL', path: 'establishments' },
    { name: 'ZONAS DE REPARTO', path: 'delivery-zones' },
    { name: 'Pedir online', path: 'category/1' },
  ];

  constructor() {
    super();
  }

  navigateToHome() {
    this.navigation.forward('home');
  }

  onAuth() {
    if (this.session.user) {
      this.navigation.forward('/profile');
    } else {
      this.navigation.forward('/auth/login');
    }
  }

  async onCart(event: Event): Promise<void> {
    this.popup.showWithData({
      component: ShoppingCartComponent,
      event,
      arrow: false,
      alignment: 'end',
    });
  }

}
