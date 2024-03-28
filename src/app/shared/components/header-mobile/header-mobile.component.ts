import { Component, inject } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from "@ionic/angular/standalone";
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

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
    this.navigation.forward('/menu');
  }

  onUser(): void {
    if (this.session.user) {
      this.navigation.forward('/profile');
    } else {
      this.navigation.forward('/auth/login');
    }
  }
}
