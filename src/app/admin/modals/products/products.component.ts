import { DecimalPipe } from "@angular/common";
import { Component, DestroyRef, Input, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonToggle, ToggleCustomEvent, IonSearchbar } from "@ionic/angular/standalone";
import { FilterPipe } from '@shared/pipes/filter.pipe';
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { ProductDto, ProductsProxy } from '@shared/proxies/products.proxie';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [IonSearchbar, IonToggle, DecimalPipe, FilterPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class AdminProductsModalComponent {

  private productsService = inject(ProductsService);
  private productsProxy = inject(ProductsProxy);
  private _destroyRef = inject(DestroyRef);

  @Input() categoryId!: string;
  @Input() category: string = '';

  term: string = '';
  products = signal<ProductDto[]>([]);

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.products.set(this.productsService.products());
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
    this.productsProxy.addCategory(
      product.id!,
      this.categoryId
    ).pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  removeCategory(product: ProductDto): void {
    this.productsProxy.removeCategory(
      product.id!,
      this.categoryId
    ).pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }

  checked(categories: CategoryDto[]): boolean {
    return categories.some((category) => category.id === this.categoryId);
  }
}
