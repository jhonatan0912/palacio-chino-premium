import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { ProductDto } from '@shared/proxies/products.proxie';

@Component({
  selector: 'shopping-cart-product',
  standalone: true,
  imports: [FormsModule, SrcImagePipe],
  templateUrl: './shopping-cart-product.component.html',
  styleUrls: ['./shopping-cart-product.component.scss']
})
export class ShoppingCartProductComponent {

  product = input.required<ProductDto>();
  quantity = model.required<number>();

  substract(): void {
    if (this.quantity() > 1) {
      this.quantity.update((prev) => prev - 1);
    }
  }

  add(): void {
    this.quantity.update((prev) => prev + 1);
  }
}
