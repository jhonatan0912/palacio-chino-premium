import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from '@core/view-component';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { IonSkeletonText } from "@ionic/angular/standalone";
import { CategoriesService } from '@shared/services/categories.service';

@Component({
  selector: 'categories-menu',
  standalone: true,
  imports: [IonSkeletonText, CategoryMenuComponent],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
})
export class CategoriesMenuComponent extends ViewComponent  {

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
