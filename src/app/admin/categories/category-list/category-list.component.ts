import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CategoryListItemComponent } from './category-list-item/category-list-item.component';
import { CategoryDto } from '@shared/proxies/categories.proxies';

@Component({
  selector: 'category-list',
  standalone: true,
  imports: [IonIcon, CategoryListItemComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {

  @Input() categories!: CategoryDto[];

}
