import { EditProductImageComponent } from '@admin/modals/edit-product-image/edit-product-image.component';
import { Component, model } from '@angular/core';
import { ViewComponent } from 'pc-core';
import { ProductDto } from 'pc-proxies';
import { ImageBrokenDirective } from '@shared/directives/imageBroken.directive';

@Component({
  selector: 'admin-product-item',
  standalone: true,
  imports: [ImageBrokenDirective],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent extends ViewComponent {

  product = model.required<ProductDto>();

  onEditImage(): void {
    this.dialog.showWithData({
      component: EditProductImageComponent,
      componentProps: {
        product: this.product()
      }
    }).then(res => {
      if (!res || res === 'cancel') return;
      this.product.set(res);
    });
  }
}
