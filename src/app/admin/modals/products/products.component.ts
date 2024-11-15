import { CheckedPipe } from '@admin/pipes/checked.pipe';
import { AdminProductsService } from '@admin/services/products.service';
import { DecimalPipe } from "@angular/common";
import { Component, DestroyRef, Input, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonToggle, ToggleCustomEvent } from "@ionic/angular/standalone";
import { FilterPipe } from '@shared/pipes/filter.pipe';
import { ProductDto, ProductsProxy } from 'pc-proxies';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [IonSearchbar, IonToggle, DecimalPipe, FilterPipe, FormsModule, CheckedPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class AdminProductsModalComponent {

  private readonly _productsProxy = inject(ProductsProxy);
  private readonly _productsService = inject(AdminProductsService);
  private readonly _destroyRef = inject(DestroyRef);

  @Input() categoryId!: string;
  @Input() category: string = '';

  term: string = '';
  products = computed<ProductDto[]>(() => this._productsService.products());

  ngOnInit() {
    this.onGetProducts();
  }

  onGetProducts(): void {
    this._productsService.products;
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
}
