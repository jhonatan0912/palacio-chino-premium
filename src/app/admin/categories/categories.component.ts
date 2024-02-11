import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesProxy } from '@shared/proxies/categories.proxies';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CategoryFormComponent, CategoryListComponent],
  providers: [CategoriesProxy],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {


}
