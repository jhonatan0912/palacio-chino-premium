import { NgClass } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, WritableSignal, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from '@core/view-component';
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';

@Component({
  selector: 'categories-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss'],
})
export class CategoriesMenuComponent extends ViewComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);
  private destroyRef = inject(DestroyRef);

  selectedId!: string;
  menuOptions!: WritableSignal<CategoryDto[]>;

  constructor() {
    super();
    // this.selectedId = this.menuOptions[0].id;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesProxy.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (categories) => {
          this.menuOptions.set(categories);
          console.log(this.menuOptions());
        }
      });
  }

  navigateToCategory(id: string): void {
    this.selectedId = id;
    this.navigation.forward(`category/${id}`);
  }

}
