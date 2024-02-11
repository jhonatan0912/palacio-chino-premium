import { Component, OnInit, inject } from '@angular/core';
import { Action } from '@core/services/types';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'category-list-item-popover',
  standalone: true,
  providers: [PopoverController],
  templateUrl: './category-list-item-popover.component.html',
  styleUrls: ['./category-list-item-popover.component.scss'],
})
export class CategoryListItemPopoverComponent implements OnInit {

  private popoverController = inject(PopoverController);

  constructor() { }

  ngOnInit() { }

  onAction(action: Action): void {
    this.popoverController.dismiss(action);
  }
}
