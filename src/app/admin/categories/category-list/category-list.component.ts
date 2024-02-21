import { Component, DestroyRef, OnInit, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonIcon } from '@ionic/angular/standalone';
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoriesService } from '../../services/categories.service';
import { CategoryListItemComponent } from './category-list-item/category-list-item.component';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [IonIcon, CategoryListItemComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {

  private categoriesService = inject(CategoriesService);
  private destroyRef = inject(DestroyRef);

  categories = input<CategoryDto[]>([]);

  ngOnInit(): void {
    this.categoriesService.onCategory
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (category) => {
          this.categories().push(category);
        }
      });
  }

  onDelete(id: string): void {
    this.categories = input(this.categories().filter((category) => category.id !== id));
  }
}
