import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from '@core/view-component';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { IonSkeletonText } from "@ionic/angular/standalone";
import { CategoriesService } from '@admin/services/categories.service';

@Component({
  selector: 'categories-menu',
  standalone: true,
  imports: [IonSkeletonText, CategoryMenuComponent],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
})
export class CategoriesMenuComponent extends ViewComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);
  private categoriesService = inject(CategoriesService);
  private destroyRef = inject(DestroyRef);

  categories = signal<CategoryDto[]>([]);
  selectedId!: string;

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
          this.categories.set(categories);
          this.categoriesService.categories.set(categories);
          this.selectedId = this.categories()[0].id!;
        }
      });
  }

  navigateToCategory(id: string): void {
    this.selectedId = id;
    this.navigation.forward(`category/${id}`);
  }

}
