import { Component, DestroyRef, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonIcon } from "@ionic/angular/standalone";
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoryListItemPopoverComponent } from './category-list-item-popover/category-list-item-popover.component';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'category-list-item',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
})
export class CategoryListItemComponent extends ViewComponent {

  private categoriesProxy = inject(CategoriesProxy);
  private deleteDestroyRef = inject(DestroyRef);

  category = input.required<CategoryDto>();

  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  async onOptions(event: Event, id: string): Promise<void> {
    this.popup.showWithData({
      component: CategoryListItemPopoverComponent,
      event: event,
      side: 'left',
      arrow: false,
      alignment: 'start'
    }).then((action) => {
      if (!action) return;

      switch (action) {
        case 'edit':

          break;
        case 'delete':
          this.handleDelete(id);
          break;

        default:
          break;
      }
    });


  }

  handleDelete(id: string): void {
    this.categoriesProxy.delete(id)
      .pipe(takeUntilDestroyed(this.deleteDestroyRef))
      .subscribe({
        next: () => {
          this.onDelete.emit(id);
        }
      });
  }

}
