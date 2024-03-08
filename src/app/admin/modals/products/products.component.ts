import { DecimalPipe } from "@angular/common";
import { Component, DestroyRef, Input, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonToggle, ToggleCustomEvent } from "@ionic/angular/standalone";
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { ProductDto, ProductsProxy } from '@shared/proxies/products.proxie';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [IonToggle, DecimalPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsModalComponent {

  private productsService = inject(ProductsService);
  private productsProxy = inject(ProductsProxy);
  private destroyRef = inject(DestroyRef);

  @Input() categoryId!: string;
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
