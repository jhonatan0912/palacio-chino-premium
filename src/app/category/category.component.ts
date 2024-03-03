import { Component, DestroyRef, WritableSignal, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonicModule } from '@ionic/angular';
import { CategoriesMenuComponent } from '@shared/components/categories-menu/categories-menu.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { ProductDto, ProductsProxy } from '@shared/proxies/products.proxie';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IonicModule, CategoriesMenuComponent, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {

  private categoriesProxy = inject(CategoriesProxy);
  private productsProxy = inject(ProductsProxy);
  private destroyRef = inject(DestroyRef);

  id = input.required<string>();
  category: WritableSignal<CategoryDto | undefined> = signal(undefined);
  products = signal<ProductDto[]>([]);

  constructor() {
    effect(() => {
      this.getCategoryInfo(this.id());
      this.getProductsByCategory(this.id());
    });
  }

  getCategoryInfo(id: string): void {
    this.categoriesProxy.get(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (category) => {
          this.category.set(category);
        }
      });
  }

  getProductsByCategory(id: string): void {
    this.productsProxy.getByCategory(id)
      .subscribe({
        next: (products) => {
          this.products.set(products);
        }
      });
  }

}
