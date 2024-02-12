import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SlugPipe } from '@shared/pipes/slug.pipe';
import { CategoriesProxy, getSlug, onFileChange } from '@shared/proxies/categories.proxies';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'category-form',
  standalone: true,
  imports: [FormsModule, SlugPipe],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {

  private categoriesProxy = inject(CategoriesProxy);
  private categoriesService = inject(CategoriesService);
  private destroyRef = inject(DestroyRef);

  icon: File | undefined;
  name: string = '';
  preview: string = '';

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
    if (!this.icon) return;

    this.preview = URL.createObjectURL(this.icon);
  }

  resetForm(): void {
    this.icon = undefined;
    this.name = '';
    this.preview = '';
  }
}
