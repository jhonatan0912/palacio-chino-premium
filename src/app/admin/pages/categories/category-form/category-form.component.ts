import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { SlugPipe } from '@shared/pipes/slug.pipe';
import { CategoriesService } from '@shared/services/categories.service';
import { CategoriesProxy, getSlug, onFileChange } from 'pc-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [IonSpinner, ImageUploaderComponent, IonIcon, FormsModule, SlugPipe, ButtonComponent],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class AdminCategoryFormComponent {

  private readonly _categoriesProxy = inject(CategoriesProxy);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _storage = inject(Storage);

  busy: boolean = false;
  icon: File | undefined;
  name: string = '';

  addCategory(): void {
    if (!this.icon) return;

    const imgRef = ref(this._storage, `categories/${this.icon.name}-${crypto.randomUUID()}`);

    this.busy = true;
    uploadBytes(imgRef, this.icon)
      .then(async (res) => {
        const url = await getDownloadURL(res.ref);
        this._categoriesProxy.create(
          url,
          this.name,
          getSlug(this.name)
        ).pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.busy = false)
        ).subscribe({
          next: (category) => {
            this._categoriesService.onCategory.next(category);
            this.resetForm();
          },
          error: (error) => {
            console.error(error);
          }
        });
      });

  }

  onFileChange(event: any) {
    this.icon = onFileChange(event);
  }

  resetForm(): void {
    this.icon = undefined;
    this.name = '';
  }
}
