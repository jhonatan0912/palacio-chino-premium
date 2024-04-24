import { DecimalPipe } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { ImageBrokenDirective } from '@shared/directives/imageBroken.directive';
import { QuantityInputDirective } from '@shared/directives/quantityInput.directive';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { ShoppingCartService } from '@shared/services/shopping-cart.service';
import { ProductDto } from 'pc-proxies';

@Component({
  selector: 'shopping-cart-product',
  standalone: true,
  imports: [IonIcon, DecimalPipe, SrcImagePipe, QuantityInputDirective, ImageBrokenDirective],
  templateUrl: './shopping-cart-product.component.html',
  styleUrls: ['./shopping-cart-product.component.scss']
})
export class ShoppingCartProductComponent {

  private shoppingCartService = inject(ShoppingCartService);

  product = model.required<ProductDto>();

  decreaseQuantity(): void {
    this.shoppingCartService.substract(this.product());
  }

  increaseQuantity(): void {
    this.shoppingCartService.add(this.product());
  }

  removeProduct(): void {
    this.shoppingCartService.remove(this.product());
  }
}
