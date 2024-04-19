import { CategoriesService } from '@shared/services/categories.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { SlugPipe } from '@shared/pipes/slug.pipe';
import { finalize } from 'rxjs';
import { CategoriesProxy, getSlug, onFileChange } from 'pc-proxies';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [IonSpinner, ImageUploaderComponent, IonIcon, FormsModule, SlugPipe, ButtonComponent],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class AdminCategoryFormComponent {

  private categoriesProxy = inject(CategoriesProxy);
  private categoriesService = inject(CategoriesService);
  private destroyRef = inject(DestroyRef);

  busy: boolean = false;
  icon: File | undefined;
  name: string = '';

  addCategory(): void {
    if (!this.icon) return;
    this.busy = true;

    this.categoriesProxy.create(
      this.icon,
      this.name,
      getSlug(this.name)
    ).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.busy = false)
    ).subscribe({
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
