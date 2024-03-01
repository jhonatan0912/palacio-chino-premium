import { Component, OnInit } from '@angular/core';
import { ProductsFormComponent } from './products-form/products-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsFormComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
