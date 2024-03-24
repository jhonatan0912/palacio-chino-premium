import { CategoriesService } from '@shared/services/categories.service';
import { Component, effect, inject, signal } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from '@ionic/angular/standalone';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';


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
  private shoppingCartService = inject(ShoppingCartService);

  cartBadge = signal<number | null>(null);
  options: HeaderOption[] = [
    { name: 'PROMOCIONES', path: '' },
    { name: 'LOCAL', path: 'establishments' },
    { name: 'GALERY', path: 'galery' },
  ];

  constructor() {
    super();
    effect(() => {
      const id = this.categoriesService.categories()[0]?.id;
      if (!id) return;

      this.options[0].path = `/category/${id}`;

      this.cartBadge.set(this.shoppingCartService.cart().length);
    }, { allowSignalWrites: true });
  }

  navigateToHome(): void {
    this.navigation.forward('/');
  };

  onAuth(): void {
    if (this.session.user) {
      this.navigation.forward('/profile');
    } else {
      this.navigation.forward('/auth/login');
    }
  }

  onOptionNavigate(path: string): void {
    this.navigation.forward(path);
  }

  async onCart(event: Event): Promise<void> {
    this.popup.showWithData({
      component: ShoppingCartComponent,
      event,
      arrow: false,
      alignment: 'end',
      cssClass: ['shopping-cart']
    });
  }

}
