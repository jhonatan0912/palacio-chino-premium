import { Component } from '@angular/core';
import { AdminCategoryActions, ViewComponent } from 'pc-core';


@Component({
  selector: 'category-list-item-popover',
  standalone: true,
  templateUrl: './category-list-item-popover.component.html',
  styleUrls: ['./category-list-item-popover.component.scss'],
})
export class CategoryListItemPopoverComponent extends ViewComponent {

  onAction(action: AdminCategoryActions): void {
    this.popup.dismiss(action);
  }
}
