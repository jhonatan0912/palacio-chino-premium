import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { } from '@ionic/angular';
import { CategoriesMenuComponent } from '@shared/components/categories-menu/categories-menu.component';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { CategoriesService } from '@shared/services/categories.service';
import { ViewComponent } from 'pc-core';
import { CategoryDto, ProductDto, ProductsProxy } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';
import { CategorySkeletonComponent } from './category-skeleton/category-skeleton.component';
import { IonSpinner } from '@ionic/angular/standalone';
import { MenuChatButtonComponent } from '../menu/menu-chat-button/menu-chat-button.component';
import { AiService } from '@shared/services/ai.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    IonSpinner,
    CategoriesMenuComponent,
    ProductCardComponent,
    CategorySkeletonComponent,
    MenuChatButtonComponent,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends ViewComponent implements OnInit {

  private readonly _title = inject(Title);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _productsProxy = inject(ProductsProxy);

  aiService = inject(AiService);

  id = signal<string>('');
  products = signal<ProductDto[]>([]);
  category = computed<CategoryDto | undefined>(() => this._categoriesService.categories().find(c => c.id === this.id()));
  page: number = 1;
  lastPage: number = 1;
  busy = signal<boolean>(false);

  ngOnInit(): void {
    this._activatedRoute.params
      .subscribe(({ id }) => {
        if (!id) return;

        this.id.set(id);
        this._title.setTitle(this.category()?.name || 'Categoría');
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
