import { DecimalPipe } from "@angular/common";
import { Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonToggle, ToggleCustomEvent } from "@ionic/angular/standalone";
import { FilterPipe } from '@shared/pipes/filter.pipe';
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { ProductDto, ProductsProxy } from '@shared/proxies/products.proxie';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [IonSearchbar, IonToggle, DecimalPipe, FilterPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class AdminProductsModalComponent {

  private readonly _productsProxy = inject(ProductsProxy);
  private readonly _destroyRef = inject(DestroyRef);

  @Input() categoryId!: string;
  @Input() category: string = '';

  term: string = '';
  products = signal<ProductDto[]>([]);

  ngOnInit() {
    this.onGetProducts();
  }

  onGetProducts(page: number = 1, limit: number = 30): void {
    this._productsProxy.getAll(
      page,
      limit
    ).pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.products.set(res.products);
        }
      });
  }

  onChange(event: ToggleCustomEvent, product: ProductDto): void {
    const checked = event.detail.checked;
    if (checked) {
      this.addCategory(product);
    } else {
      this.removeCategory(product);
    }
  }

  addCategory(product: ProductDto): void {
    this._productsProxy.addCategory(
      product.id!,
      this.categoryId
    ).pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  removeCategory(product: ProductDto): void {
    this._productsProxy.removeCategory(
      product.id!,
      this.categoryId
    ).pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  checked(categories: CategoryDto[]): boolean {
    return categories.some((category) => category.id === this.categoryId);
  }
}
