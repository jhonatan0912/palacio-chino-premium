import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlugPipe } from '@shared/pipes/slug.pipe';
import { CategoriesProxy, getSlug, onFileChange } from '@shared/proxies/categories.proxies';

interface CategoryForm {
  icon: File | undefined;
  name: string;
}

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [FormsModule, SlugPipe],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {

  private categoriesProxy = inject(CategoriesProxy);

  categoryForm: CategoryForm = {
    icon: undefined,
    name: '',
  };

  preview: string = '';

  addCategory(): void {
    const { icon, name } = this.categoryForm;
    console.log(icon);
    if (!icon) return;
    console.log(icon);
    this.categoriesProxy.create(
      icon,
      name,
      getSlug(name)
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
      icon: undefined,
      name: '',
    };
  }

  onFileChange(event: any) {
    this.categoryForm.icon = onFileChange(event);
    if (!this.categoryForm.icon) return;

    this.preview = URL.createObjectURL(this.categoryForm.icon);
  }

}
