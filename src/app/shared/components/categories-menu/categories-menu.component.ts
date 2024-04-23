import { Component, computed, inject } from '@angular/core';
import { IonSkeletonText } from "@ionic/angular/standalone";
import { CategoriesService } from '@shared/services/categories.service';
import { ViewComponent } from 'pc-core';
import { CategoryDto } from 'pc-proxies';
import { CategoryMenuComponent } from './category-menu/category-menu.component';

@Component({
  selector: 'categories-menu',
  standalone: true,
  imports: [IonSkeletonText, CategoryMenuComponent],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
})
export class CategoriesMenuComponent extends ViewComponent {

  private readonly _categoriesService = inject(CategoriesService);

  categories = computed<CategoryDto[]>(() => this._categoriesService.categories());

  constructor() {
    super();
  }

  navigateToCategory(id: string): void {
    this._categoriesService.selectedId.update(() => id);
    this.navigation.forward(`/category/${id}`);
  }

}
