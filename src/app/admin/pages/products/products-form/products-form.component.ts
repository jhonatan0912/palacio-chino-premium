import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { ProductsService } from '@shared/services/products.service';
import { ProductsProxy, onFileChange } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'products-form',
  standalone: true,
  imports: [IonSpinner, ButtonComponent, ImageUploaderComponent, FormsModule, DecimalPipe],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent {

  private productsProxy = inject(ProductsProxy);
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);

  busy: boolean = false;
  image: File | undefined;
  name: string = '';
  price: number = 0;
  description: string = '';

  onCreate(): void {
    if (!this.image) return;

    this.busy = true;
    this.productsProxy.create(
      this.image!,
      this.name,
      this.price,
      this.description
    ).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.busy = false)
    ).subscribe({
      next: (product) => {
        this.productsService.products.update((prev) => [...prev, product]);
        this.resetForm();
      },
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
