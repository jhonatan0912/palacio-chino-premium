import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { AdminCategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesService } from '@shared/services/categories.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, AdminCategoryFormComponent, CategoryListComponent],
  providers: [CategoriesProxy],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {

  private categoriesService = inject(CategoriesService);

  categories = signal<CategoryDto[]>([]);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories.set(this.categoriesService.categories());
  }

}
