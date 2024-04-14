import { Component, DestroyRef, OnInit, WritableSignal, computed, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from '@core/view-component';
import { IonicModule } from '@ionic/angular';
import { CategoriesMenuComponent } from '@shared/components/categories-menu/categories-menu.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { CategoriesProxy, CategoryDto, ProductDto, ProductsProxy } from '@shared/proxies';
import { finalize } from 'rxjs/internal/operators/finalize';
import { CategorySkeletonComponent } from './category-skeleton/category-skeleton.component';
import { CategoriesService } from '@shared/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IonicModule, CategoriesMenuComponent, ProductCardComponent, CategorySkeletonComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends ViewComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _productsProxy = inject(ProductsProxy);

  id = signal<string>('');
  products = signal<ProductDto[]>([]);
  category = computed<CategoryDto | undefined>(() => this._categoriesService.categories().find(c => c.id === this.id()));
  page: number = 1;
  lastPage: number = 1;
  busy = signal<boolean>(false);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._activatedRoute.params
      .subscribe(({ id }) => {
        if (!id) return;

        this.id.set(id);
        this.getProductsByCategory(id, true);
      });
  }


  getProductsByCategory(id: string, initial: boolean): void {
    if (initial) {
      this.page = 1;
      this.lastPage = 1;
      this.products.set([]);
    }
    if (this.page > this.lastPage) return;

    this.busy.set(true);
    this._productsProxy.getByCategory(id)
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
