import { Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PopoverController } from '@ionic/angular';
import { IonIcon } from "@ionic/angular/standalone";
import { CategoriesProxy, CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoryListItemPopoverComponent } from './category-list-item-popover/category-list-item-popover.component';

@Component({
  selector: 'category-list-item',
  standalone: true,
  imports: [IonIcon],
  providers: [PopoverController],
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
})
export class CategoryListItemComponent {

  private categoriesProxy = inject(CategoriesProxy);
  private popoverController = inject(PopoverController);
  private deleteDestroyRef = inject(DestroyRef);

  @Input() category!: CategoryDto;

  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  async onOptions(event: Event, id: string): Promise<void> {
    const popover = await this.popoverController.create({
      event,
      component: CategoryListItemPopoverComponent,
      side: 'left',
      arrow: false,
      alignment: 'start'
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (!data) return;

    switch (data) {
      case 'edit':

        break;
      case 'delete':
        this.handleDelete(id);
        break;

      default:
        break;
    }
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
