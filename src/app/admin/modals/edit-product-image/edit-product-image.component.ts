import { Component, Input, inject, signal } from '@angular/core';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { TitleModalComponent } from "@shared/components/title-modal/title-modal.component";
import { ViewComponent } from 'pc-core';
import { ProductDto, ProductsProxy, onFileChange } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'edit-product-image',
  standalone: true,
  imports: [IonSpinner, IonIcon, ImageUploaderComponent, TitleModalComponent,],
  templateUrl: './edit-product-image.component.html',
  styleUrls: ['./edit-product-image.component.scss']
})
export class EditProductImageComponent extends ViewComponent {

  private readonly _productsProxy = inject(ProductsProxy);

  @Input() product!: ProductDto;

  busy: boolean = false;
  image = signal<File | undefined>(undefined);

  constructor() {
    super();
  }

  onUpdate(): void {
    if (!this.image()) return;
    this.busy = true;

    this._productsProxy.updateImage(
      this.product.id!,
      this.image()
    ).pipe(finalize(() => this.busy = false))
      .subscribe({
        next: (product) => {
          this.dialog.dismiss(product);
        }
      });
  }

  onChange(event: File): void {
    this.image.set(onFileChange(event));
  }
}
