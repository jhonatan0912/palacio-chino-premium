import { Component } from '@angular/core';
import { Action } from '@core/services/types';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'category-list-item-popover',
  standalone: true,
  templateUrl: './category-list-item-popover.component.html',
  styleUrls: ['./category-list-item-popover.component.scss'],
})
export class CategoryListItemPopoverComponent extends ViewComponent {

  onAction(action: Action): void {
    this.popup.dismiss(action);
  }
}
