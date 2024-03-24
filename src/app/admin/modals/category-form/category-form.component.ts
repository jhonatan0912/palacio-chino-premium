import { AdminCategoryFormComponent } from '@admin/pages/categories/category-form/category-form.component';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesProxy } from '@shared/proxies/categories.proxies';

@Component({
  selector: 'admin-category-form',
  standalone: true,
  imports: [AdminCategoryFormComponent],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class AdminCategoryFormModalComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);
  private destroyRef = inject(DestroyRef);

  @Input() categoryId!: string;

  constructor() { }

  ngOnInit() {
    this.onGetCategory();
  }

  onGetCategory(): void {
    this.categoriesProxy.get(this.categoryId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (category) => {

        },
        error: (err) => console.error(err)
      });
  }

}
