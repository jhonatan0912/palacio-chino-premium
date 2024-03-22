import { Component, DestroyRef, WritableSignal, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from '@core/view-component';
import { IonicModule } from '@ionic/angular';
import { CategoriesMenuComponent } from '@shared/components/categories-menu/categories-menu.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { ProductDto, ProductsProxy } from '@shared/proxies/products.proxie';
import { finalize } from 'rxjs/internal/operators/finalize';
import { CategorySkeletonComponent } from './category-skeleton/category-skeleton.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IonicModule, CategoriesMenuComponent, ProductCardComponent, CategorySkeletonComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends ViewComponent {

  private categoriesProxy = inject(CategoriesProxy);
  private productsProxy = inject(ProductsProxy);
  private destroyRef = inject(DestroyRef);

  id = input.required<string>();
  category: WritableSignal<CategoryDto | undefined> = signal(undefined);
  products = signal<ProductDto[]>([]);
  busy = signal<boolean>(false);

  constructor() {
    super();
    effect(() => {
      this.getCategoryInfo(this.id());
      this.getProductsByCategory(this.id());
    }, { allowSignalWrites: true });
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
    this.busy.set(true);
    this.productsProxy.getByCategory(id)
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: (res) => {
          this.products.set(res.products);
        }
      });
  }
}
