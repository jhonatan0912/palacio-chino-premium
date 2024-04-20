import { Component, effect, inject, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CategoriesService } from '@shared/services/categories.service';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ViewComponent } from 'pc-core';


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

  private _categoriesService = inject(CategoriesService);
  private _shoppingCartService = inject(ShoppingCartService);

  cartBadge = signal<number | null>(null);
  options: HeaderOption[] = [
    { name: 'LOCAL', path: 'establishments' },
    { name: 'GALERÍA', path: 'galery' },
  ];

  constructor() {
    super();
    effect(() => {
      this.cartBadge.set(this._shoppingCartService.cart().length);
    }, { allowSignalWrites: true });
  }

  navigateToHome(): void {
    this._categoriesService.selectedId.update(() => '');
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
