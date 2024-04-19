import { AdminProductsModalComponent } from '@admin/modals/products/products.component';
import { Component, DestroyRef, EventEmitter, Output, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ViewComponent } from 'pc-core';
import { IonIcon } from "@ionic/angular/standalone";
import { CategoriesProxy, CategoryDto } from 'pc-proxies';
import { CategoryListItemPopoverComponent } from './category-list-item-popover/category-list-item-popover.component';
import { EditCategoryImageComponent } from '@admin/modals/edit-category-image/edit-category-image.component';

@Component({
  selector: 'category-list-item',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
})
export class CategoryListItemComponent extends ViewComponent {

  private readonly _categoriesProxy = inject(CategoriesProxy);
  private readonly _deleteDestroyRef = inject(DestroyRef);

  category = input.required<CategoryDto>();

  @Output() onUpdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  async onOptions(event: Event, id: string): Promise<void> {
    this.popup.showWithData({
      component: CategoryListItemPopoverComponent,
      event: event,
      side: 'start',
      arrow: false,
      alignment: 'start',
      showBackdrop: false,
    }).then((action) => {
      if (!action) return;

      switch (action) {
        case 'edit': return this.onUpdate.emit(id);
        case 'delete': return this.handleDelete(id);
        case 'assign': return this.openProductsModal(id);
        case 'change-icon': return this.onEditImage(id);
      }
    });
  }

  openProductsModal(id: string): void {
    this.dialog.showWithData({
      component: AdminProductsModalComponent,
      componentProps: {
        categoryId: id,
        category: this.category().name
      }
    });
  }

  onEditImage(id: string): void {
    this.dialog.showWithData({
      component: EditCategoryImageComponent,
      componentProps: {
        id: id
      }
    });
  }

  handleDelete(id: string): void {
    this._categoriesProxy.delete(id)
      .pipe(takeUntilDestroyed(this._deleteDestroyRef))
      .subscribe({
        next: () => {
          this.onDelete.emit(id);
        }
      });
  }

}
