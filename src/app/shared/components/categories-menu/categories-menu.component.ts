import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from '@core/view-component';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { environment } from '../../../../environments/environment.development';
import { CategoryMenuComponent } from './category-menu/category-menu.component';

@Component({
  selector: 'categories-menu',
  standalone: true,
  imports: [ CategoryMenuComponent],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
})
export class CategoriesMenuComponent extends ViewComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);
  private destroyRef = inject(DestroyRef);

  baseUrl: string = environment.api;
  selectedId!: string;
  categories: CategoryDto[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesProxy.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      });
  }

  navigateToCategory(id: string): void {
    this.selectedId = id;
    this.navigation.forward(`category/${id}`);
  }

}
