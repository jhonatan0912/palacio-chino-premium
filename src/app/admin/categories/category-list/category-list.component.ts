import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CategoryListItemComponent } from './category-list-item/category-list-item.component';
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoriesService } from '../../services/categories.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  @Input() categories!: CategoryDto[];

  ngOnInit(): void {
    this.categoriesService.onCategory
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (category) => {
          this.categories = [...this.categories, category];
        }
      });
  }

  onDelete(id: string): void {
    console.log('onDelete');
    this.categories = this.categories.filter((category) => category.id !== id);
    console.log(this.categories);
  }
}
