import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { AdminCategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, AdminCategoryFormComponent, CategoryListComponent],
  providers: [CategoriesProxy],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);

  categories = signal<CategoryDto[]>([]);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesProxy.getAll()
      .subscribe({
        next: (categories) => {
          this.categories.set(categories);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

}
