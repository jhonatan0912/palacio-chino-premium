import { Component, OnInit, inject } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);

  categories: CategoryDto[] = [];

  constructor() { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
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
