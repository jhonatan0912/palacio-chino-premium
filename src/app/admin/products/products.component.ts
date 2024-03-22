import { Component, OnInit } from '@angular/core';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsViewComponent } from './products-view/products-view.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsFormComponent, ProductsViewComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
