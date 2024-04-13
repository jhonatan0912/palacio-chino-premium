import { AdminProductsService } from '@admin/services/products.service';
import { Component, computed, inject } from '@angular/core';
import { ProductDto } from '@shared/proxies';
import { ProductItemComponent } from './product-item/product-item.component';
import { ViewComponent } from '@core/view-component';
import { EditProductImageComponent } from '@admin/modals/edit-product-image/edit-product-image.component';

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

  onEditImage(product: ProductDto): void {
    this.dialog.showWithData({
      component: EditProductImageComponent,
      componentProps: {
        product: product
      }
    }).then(res => {
      debugger;
      if (!res || res === 'cancel') return;
      this._productsService.products.update((prev) => {
        const index = prev.findIndex(p => p.id === res.id);
        prev[index] = res;
        return prev;
      });
      console.log(this._productsService.products());
    });
  }
}
