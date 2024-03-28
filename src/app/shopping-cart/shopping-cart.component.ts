import { Component, effect, inject, signal } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { ProductDto } from '@shared/proxies/products.proxie';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { ShoppingCartProductComponent } from './shopping-cart-product/shopping-cart-product.component';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'shopping-cart',
  standalone: true,
  imports: [IonIcon, ShoppingCartProductComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends ViewComponent {

  private readonly _shoppingCartService = inject(ShoppingCartService);

  products = signal<ProductDto[]>([]);
  total = signal<number>(0);

  constructor() {
    super();
    
    effect(() => {
      this.products.set(this._shoppingCartService.cart());
      this.total.set(this.products().reduce((acc, product) => acc + (product.price * product.quantity!), 0));
    }, { allowSignalWrites: true });
  }

  onBack(): void {
    this.navigation.back('/menu');
  }
}
