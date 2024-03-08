import { Component, inject, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { ProductDto } from '@shared/proxies/products.proxie';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-product',
  standalone: true,
  imports: [FormsModule, SrcImagePipe],
  templateUrl: './shopping-cart-product.component.html',
  styleUrls: ['./shopping-cart-product.component.scss']
})
export class ShoppingCartProductComponent {

  private shoppingCartService = inject(ShoppingCartService);

  product = input.required<ProductDto>();
  quantity = model.required<number>();

  substract(): void {
    if (this.quantity() > 1) {
      this.quantity.update((prev) => prev--);
      this.shoppingCartService.substract(this.product());
    }
  }

  add(): void {
    this.quantity.update((prev) => prev++);
    this.shoppingCartService.add(this.product());
  }
}
