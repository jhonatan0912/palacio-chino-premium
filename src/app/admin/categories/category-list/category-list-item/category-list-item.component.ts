import { Component, Input, OnInit, inject } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IonIcon } from "@ionic/angular/standalone";
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoryListItemPopoverComponent } from './category-list-item-popover/category-list-item-popover.component';

@Component({
  selector: 'category-list-item',
  standalone: true,
  imports: [IonIcon],
  providers: [PopoverController],
  templateUrl: './category-list-item.component.html',
  styleUrls: ['./category-list-item.component.scss'],
})
export class CategoryListItemComponent implements OnInit {

  private popoverController = inject(PopoverController);

  @Input() category!: CategoryDto;

  constructor() { }

  ngOnInit() { }

  async onOptions(event: Event): Promise<void> {
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

    console.log({ data });
  }

}
