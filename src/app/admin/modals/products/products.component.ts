import { DecimalPipe } from "@angular/common";
import { Component, inject, input, signal } from '@angular/core';
import { IonToggle } from "@ionic/angular/standalone";
import { ProductDto } from '@shared/proxies/products.proxie';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [IonToggle, DecimalPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsModalComponent {

  private productsService = inject(ProductsService);

  categoryId = input<string>();
  products = signal<ProductDto[]>([]);

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.products.set(this.productsService.products());
  }
}
