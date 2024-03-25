import { AdminCategoryFormComponent } from '@admin/pages/categories/category-form/category-form.component';
import { Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lib/button/button.component';
import { TitleModalComponent } from '@shared/components/title-modal/title-modal.component';
import { SlugPipe } from '@shared/pipes/slug.pipe';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { CategoriesProxy, CategoryDto, getSlug } from '@shared/proxies/categories.proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'admin-category-form',
  standalone: true,
  imports: [FormsModule, AdminCategoryFormComponent, TitleModalComponent, SrcImagePipe, SlugPipe, ButtonComponent],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class AdminCategoryFormModalComponent {

  private readonly _categoriesProxy = inject(CategoriesProxy);
  private readonly _destroyRef = inject(DestroyRef);

  @Input() category!: CategoryDto;

  busy: boolean = false;

  onUpdate(): void {
    this.busy = true;

    const file = typeof this.category.icon === 'string' ? undefined : this.category.icon;
    this._categoriesProxy.update(
      this.category.id!,
      file,
      this.category.name,
      getSlug(this.category.name)
    ).pipe(
      takeUntilDestroyed(this._destroyRef),
      finalize(() => this.busy = false)
    ).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

}
