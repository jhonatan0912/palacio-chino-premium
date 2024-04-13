import { Component } from '@angular/core';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsListComponent } from './products-list/products-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsFormComponent, ProductsListComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent { }
