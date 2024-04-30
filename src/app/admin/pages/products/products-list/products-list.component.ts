import { AdminProductsService } from '@admin/services/products.service';
import { Component, computed, inject } from '@angular/core';
import { ViewComponent } from 'pc-core';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDto } from 'pc-proxies';

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
}
