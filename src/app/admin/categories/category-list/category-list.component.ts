import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonIcon } from '@ionic/angular/standalone';
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { ViewComponent } from '@core/view-component';
import { CategoriesService } from '@shared/services/categories.service';
import { AdminCategoryFormModalComponent } from '@admin/modals/category-form/category-form.component';
import { CategoryListItemComponent } from './category-list-item/category-list-item.component';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [IonIcon, CategoryListItemComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent extends ViewComponent implements OnInit {

  private categoriesService = inject(CategoriesService);
  private destroyRef = inject(DestroyRef);

  categories = input<CategoryDto[]>([]);

  ngOnInit(): void {
    this.categoriesService.onCategory
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (category) => {
          this.categories().push(category);
        }
      });
  }

  onUpdate(id: string): void {
    this.dialog.showWithData({
      component: AdminCategoryFormModalComponent,
      componentProps: {
        categoryId: id
      }
    });
  }

  onDelete(id: string): void {
    this.categories = input(this.categories().filter((category) => category.id !== id));
  }
}
