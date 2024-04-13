import { Component, Input, OnInit, inject, input, signal } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { ProductDto, ProductsProxy, onFileChange } from '@shared/proxies';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { finalize } from 'rxjs/internal/operators/finalize';
import { TitleModalComponent } from "@shared/components/title-modal/title-modal.component";

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
