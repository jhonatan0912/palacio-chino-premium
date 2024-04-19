import { Component, inject } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { ViewComponent } from 'pc-core';

@Component({
  selector: 'header-mobile',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent extends ViewComponent {

  shoppingCartService = inject(ShoppingCartService);

  onShoppingCart(): void {
    this.navigation.forward('/shopping-cart');
  }

  onHome(): void {
    this.navigation.forward('/');
  }

  onUser(): void {
    if (this.session.user) {
      this.navigation.forward('/profile');
    } else {
      this.navigation.forward('/auth/login');
    }
  }
}
