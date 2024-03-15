import { DecimalPipe, JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon, PopoverController } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';
import { ProductDto } from '@shared/proxies/products.proxie';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { ShoppingCartFooterComponent } from './shopping-cart-footer/shopping-cart-footer.component';
import { ShoppingCartProductComponent } from './shopping-cart-product/shopping-cart-product.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [IonIcon, JsonPipe, ShoppingCartProductComponent, DecimalPipe, ButtonComponent, ShoppingCartFooterComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends ViewComponent {

  private popoverCtrl = inject(PopoverController);
  private shoppingCartService = inject(ShoppingCartService);

  products = signal<ProductDto[]>([]);
  total = signal<number>(0);

  constructor() {
    super();
    effect(() => {
      this.products.set(this.shoppingCartService.cart());
      this.total.set(this.products().reduce((acc, product) => acc + (product.price! * product.quantity!), 0));
    }, { allowSignalWrites: true });
  }

  onDismiss(): void {
    this.popoverCtrl.dismiss('cancel');
  }

  onPay(): void {
    if (!this.session.user) {
      this.popoverCtrl.dismiss('cancel')
        .then(() => this.navigation.forward('/auth/login'));

    } else {
      console.log(this.session.user);
    }
  }

}
