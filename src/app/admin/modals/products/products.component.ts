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
  private destroyRef = inject(DestroyRef);

  @Input() categoryId!: string;

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
    const categoryId = checked ? this.categoryId : null;

    this.productsProxy.update(
      product.id!,
      categoryId,
      product.image,
      product.name,
      product.price,
      product.description
    ).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
      }
    });
  }

  checked(categories: CategoryDto[]): boolean {
    return categories.some((category) => category.id === this.categoryId);
  }
}
