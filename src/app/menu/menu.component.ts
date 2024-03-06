import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { ProductCardComponent, ProductCardData } from '../shared/components/product-card/product-card.component';
import { CategoriesMenuComponent } from '@shared/components/categories-menu/categories-menu.component';
import { ProductDto, ProductsProxy } from '@shared/proxies/products.proxie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProductCardComponent, CategoriesMenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent extends ViewComponent implements OnInit {

  private productsProxy = inject(ProductsProxy);
  private destroyRef = inject(DestroyRef);

  limit: number = 10;
  offset: number = 0;
  promotions = signal<ProductDto[]>([]);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getPromotions();
  }

  navigateToCategory(id: string): void {
    this.navigation.forward(`category/${id}`);
  }

  getPromotions(): void {
    this.productsProxy.getPromotions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.limit += 10;
          this.offset += 10;
          this.promotions.set(res.products);
        }
      });
  }
}
