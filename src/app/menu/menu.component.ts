import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from '@core/view-component';
import { IonSpinner } from "@ionic/angular/standalone";
import { CategoriesMenuComponent } from '@shared/components/categories-menu/categories-menu.component';
import { ProductDto, ProductsProxy } from '@shared/proxies/products.proxie';
import { finalize } from 'rxjs/internal/operators/finalize';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonSpinner, ProductCardComponent, CategoriesMenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent extends ViewComponent implements OnInit {

  private productsProxy = inject(ProductsProxy);
  private destroyRef = inject(DestroyRef);

  page: number = 1;
  lastPage: number = 1;
  busy: boolean = false;
  promotions = signal<ProductDto[]>([]);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getPromotions();
  }

  navigateToCategory(id: string): void {
    this.navigation.forward(`category/${id}`);
  }

  getPromotions(): void {
    if (this.page > this.lastPage) return;

    this.busy = true;
    this.productsProxy.getPromotions(this.page)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.busy = false)
      ).subscribe({
        next: (res) => {
          this.page += 1;
          this.lastPage = res.meta.lastPage;
          this.promotions.set([...this.promotions(), ...res.products]);
        }
      });
  }
}
