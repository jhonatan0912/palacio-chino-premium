import { Component, effect, inject, signal } from '@angular/core';
import { IonSkeletonText } from "@ionic/angular/standalone";
import { CategoriesService } from '@shared/services/categories.service';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ViewComponent } from 'pc-core';
import { CategoryDto } from 'pc-proxies';

@Component({
  selector: 'categories-menu',
  standalone: true,
  imports: [IonSkeletonText, CategoryMenuComponent],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
})
export class CategoriesMenuComponent extends ViewComponent {

  private categoriesService = inject(CategoriesService);

  categories = signal<CategoryDto[]>([]);
  selectedId!: string;

  constructor() {
    super();
    effect(() => {
      this.categories.set(this.categoriesService.categories());
      this.selectedId = this.categories()[0].id!;
    }, { allowSignalWrites: true });
  }

  navigateToCategory(id: string): void {
    this.selectedId = id;
    this.navigation.forward(`category/${id}`);
  }

}
