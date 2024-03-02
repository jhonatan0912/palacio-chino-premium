import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lib/button/button.component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { onFileChange } from '@shared/proxies/categories.proxies';
import { ProductsProxy } from '@shared/proxies/products.proxie';

@Component({
  selector: 'products-form',
  standalone: true,
  imports: [ButtonComponent, ImageUploaderComponent, FormsModule],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent {

  private productsProxy = inject(ProductsProxy);
  private destroyRef = inject(DestroyRef);

  image: File | undefined;
  name: string = '';
  price: number = 0;
  description: string = '';

  onCreate(): void {
    if (!this.image) return;

    this.productsProxy.create(
      this.image!,
      this.name,
      this.price,
      this.description
    ).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (product) => {
        console.log('Product created', product);
      },
      error: (err) => {
        console.error('Error creating product', err);
      }
    });
  }

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
