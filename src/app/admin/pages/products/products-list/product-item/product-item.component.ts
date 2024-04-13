import { EditProductImageComponent } from '@admin/modals/edit-product-image/edit-product-image.component';
import { Component, model } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { ProductDto } from '@shared/proxies';

@Component({
  selector: 'admin-product-item',
  standalone: true,
  imports: [SrcImagePipe],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent extends ViewComponent {

  product = model.required<ProductDto>();

  constructor() {
    super();
  }

  onEditImage(): void {
    this.dialog.showWithData({
      component: EditProductImageComponent,
      componentProps: {
        product: this.product()
      }
    }).then(res => {
      if (!res || res === 'cancel') return;
      console.log('Product', this.product());
      console.log('Response', res);
      this.product.set(res);
    });
  }
}
