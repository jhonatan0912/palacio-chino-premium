import { Injectable, signal } from '@angular/core';
import { SHOPPING_CART } from '@core/utils/constants';
import { ProductDto } from '@shared/proxies/products.proxie';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cart = signal<ProductDto[]>([]);

  addToCart(product: ProductDto): void {
    const productInCart = this.cart().find(p => p.id == product.id);
    if (productInCart) {
      productInCart.quantity! += 1;
      this.cart.set([...this.cart()]);
    } else {
      const newProduct = new ProductDto();
      newProduct.id = product.id;
      newProduct.name = product.name;
      newProduct.price = product.price;
      newProduct.image = product.image;
      newProduct.quantity = 1;
      this.cart.set([...this.cart(), newProduct]);
    }
    localStorage.setItem(SHOPPING_CART, JSON.stringify(this.cart()));
  }

  add(product: ProductDto): void {
    const productInCart = this.cart().find(p => p.id == product.id);
    if (productInCart) {
      productInCart.quantity! += 1;
      this.cart.set([...this.cart()]);
    }
    localStorage.setItem(SHOPPING_CART, JSON.stringify(this.cart()));
  }

  substract(product: ProductDto): void {
    const productInCart = this.cart().find(p => p.id == product.id);
    if (productInCart && productInCart.quantity! > 1) {
      productInCart.quantity! -= 1;
      this.cart.set([...this.cart()]);
    }
    localStorage.setItem(SHOPPING_CART, JSON.stringify(this.cart()));
  }

  remove(product: ProductDto): void {
    const productInCart = this.cart().find(p => p.id == product.id);
    if (productInCart) {
      this.cart.set(this.cart().filter(p => p.id !== product.id));
    }
    localStorage.setItem(SHOPPING_CART, JSON.stringify(this.cart()));
  }
}
