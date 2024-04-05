import { Component, DestroyRef, WritableSignal, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from '@core/view-component';
import { IonicModule } from '@ionic/angular';
import { CategoriesMenuComponent } from '@shared/components/categories-menu/categories-menu.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { CategoriesProxy, CategoryDto, ProductDto, ProductsProxy } from '@shared/proxies';
import { finalize } from 'rxjs/internal/operators/finalize';
import { CategorySkeletonComponent } from './category-skeleton/category-skeleton.component';
import { CategoriesService } from '@shared/services/categories.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IonicModule, CategoriesMenuComponent, ProductCardComponent, CategorySkeletonComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends ViewComponent {

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _productsProxy = inject(ProductsProxy);

  id = input.required<string>();
  products = signal<ProductDto[]>([]);
  category = signal<CategoryDto | undefined>(undefined);
  page: number = 1;
  lastPage: number = 1;
  busy = signal<boolean>(false);

  constructor() {
    super();
    effect(() => {
      this.getProductsByCategory();
      this.category.set(this._categoriesService.categories().find(c => c.id === this.id()));
    }, { allowSignalWrites: true });
  }


  getProductsByCategory(): void {
    if (this.page > this.lastPage) return;

    this.busy.set(true);
    this._productsProxy.getByCategory(this.id())
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: (res) => {
          this.page += 1;
          this.lastPage = res.meta.lastPage;
          this.products.update((prev) => [...prev, ...res.products]);
        }
      });
  }
}
