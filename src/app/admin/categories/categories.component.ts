import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CategoryFormComponent, CategoryListComponent],
  providers: [CategoriesProxy],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);

  categories: CategoryDto[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesProxy.getAll()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

}
