import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesProxy } from '@shared/proxies/categories.proxies';

interface CategoryForm {
  icon: string;
  name: string;
}

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {

  private categoriesProxy = inject(CategoriesProxy);

  categoryForm: CategoryForm = {
    icon: '',
    name: '',
  };

  get categorySlug(): string {
    return this.categoryForm.name.toLowerCase().split(' ').join('-');
  }

  addCategory(): void {
    const { icon, name } = this.categoryForm;

    this.categoriesProxy.create(
      icon,
      name,
      this.categorySlug
    ).subscribe({
      next: (response) => {
        this.resetForm();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  resetForm(): void {
    this.categoryForm = {
      icon: '',
      name: '',
    };
  }

}
