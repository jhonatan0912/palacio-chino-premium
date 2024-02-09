import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesProxy } from '@shared/proxies/categories.proxies';

interface CategoryFormValues {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule],
  providers: [CategoriesProxy],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);

  categoryForm: CategoryFormValues = {
    icon: '',
    name: '',
  };

  constructor() { }

  ngOnInit() { }

  get categoryCode(): string {
    return this.categoryForm.name.toLowerCase().split(' ').join('-');
  }


  addCategory(): void {
    const { icon, name } = this.categoryForm;

    this.categoriesProxy.create(
      icon,
      name,
      this.categoryCode
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
