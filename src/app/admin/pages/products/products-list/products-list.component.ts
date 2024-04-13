import { AdminProductsService } from '@admin/services/products.service';
import { Component, computed, inject } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { ProductDto } from '@shared/proxies';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'admin-products-list',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends ViewComponent {

  private readonly _productsService = inject(AdminProductsService);

  products = computed<ProductDto[]>(() => this._productsService.products());

  constructor() {
    super();
  }
}
