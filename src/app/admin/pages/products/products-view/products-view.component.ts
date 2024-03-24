import { Component, OnInit } from '@angular/core';
import { ProductsFormComponent } from "../products-form/products-form.component";

@Component({
  selector: 'products-view',
  standalone: true,
  imports: [ProductsFormComponent],
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {

  ngOnInit() {
  }

}
