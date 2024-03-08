import { CategoriesService } from '@shared/services/categories.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonIcon } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { SlugPipe } from '@shared/pipes/slug.pipe';
import { CategoriesProxy, getSlug, onFileChange } from '@shared/proxies/categories.proxies';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [ImageUploaderComponent, IonIcon, FormsModule, SlugPipe, ButtonComponent],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class AdminCategoryFormComponent {

  private categoriesProxy = inject(CategoriesProxy);
  private categoriesService = inject(CategoriesService);
  private destroyRef = inject(DestroyRef);

  icon: File | undefined;
  name: string = '';

  addCategory(): void {
    if (!this.icon) return;

    this.categoriesProxy.create(
      this.icon,
      this.name,
      getSlug(this.name)
    ).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (category) => {
          this.categoriesService.onCategory.next(category);
          this.resetForm();
        },
        error: (error) => {
          console.error(error);
        }
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
