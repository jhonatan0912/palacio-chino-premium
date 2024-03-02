import { CategoriesService } from '@shared/services/categories.service';
import { Component, effect, inject } from '@angular/core';
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

  private categoriesService = inject(CategoriesService);

  options: HeaderOption[] = [
    { name: 'PROMOCIONES', path: 'category/1' },
    { name: 'LOCAL', path: 'establishments' },
    { name: 'ZONAS DE REPARTO', path: 'delivery-zones' },
    { name: 'Pedir online', path: 'category/1' },
  ];

  constructor() {
    super();
    effect(() => {
      const url = this.categoriesService.categories()[0]?.id;
      if (!url) return;

      this.options[0].path = `category/${url}`;
      this.options[3].path = `category/${url}`;
    });
  }

  navigateToHome(): void {
    this.navigation.forward('home');
  };

  onAuth(): void {
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
      showBackdrop: false,
      alignment: 'end',
      cssClass: ['shopping-cart']
    });
  }

}
