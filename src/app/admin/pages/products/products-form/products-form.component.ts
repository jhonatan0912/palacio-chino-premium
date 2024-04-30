import { AdminProductsService } from '@admin/services/products.service';
import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Storage, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage";
import { FormsModule } from '@angular/forms';
import { IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { ProductsProxy, onFileChange } from 'pc-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'products-form',
  standalone: true,
  imports: [IonSpinner, ButtonComponent, ImageUploaderComponent, FormsModule, DecimalPipe],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent {

  private readonly _productsProxy = inject(ProductsProxy);
  private readonly _adminProductsService = inject(AdminProductsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _storage = inject(Storage);

  busy: boolean = false;
  image: File | undefined;
  name: string = '';
  price: number = 0;
  description: string = '';

  onCreate(): void {
    if (!this.image) return;

    const imgRef = ref(this._storage, `products/${this.image?.name}-${crypto.randomUUID()}`);

    this.busy = true;
    uploadBytes(imgRef, this.image!)
      .then(async (res) => {
        const url = await getDownloadURL(res.ref);
        this._productsProxy.create(
          url,
          this.name,
          this.price,
          this.description
        ).pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.busy = false)
        ).subscribe({
          next: (product) => {
            this._adminProductsService.products.update((prev) => [...prev, product]);
            this.resetForm();
          },
        });
      });
  };

  onFileChange(event: File) {
    this.image = onFileChange(event);
  };

  resetForm(): void {
    this.image = undefined;
    this.name = '';
    this.price = 0;
    this.description = '';
  }
}
