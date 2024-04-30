import { Component, Input, inject, signal } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { TitleModalComponent } from "@shared/components/title-modal/title-modal.component";
import { ViewComponent } from 'pc-core';
import { ProductDto, ProductsProxy, onFileChange } from 'pc-proxies';
import { finalize } from 'rxjs';

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

  onUpdate(): void {
    if (!this.image()) return;
    this.busy = true;

    const storage = getStorage();
    const splited = this.product.image.split('/');
    const name = splited.pop()?.split('?')[0].replace('%2F', '/');
    const storageRef = ref(storage, name);

    uploadBytes(storageRef, this.image()!)
      .then(async (res) => {
        const url = await getDownloadURL(res.ref);
        this._productsProxy.updateImage(
          this.product.id!,
          url
        ).pipe(finalize(() => this.busy = false))
          .subscribe({
            next: (product) => {
              this.dialog.dismiss(product);
            }
          });
      });
  }

  onChange(event: File): void {
    this.image.set(onFileChange(event));
  }
}
