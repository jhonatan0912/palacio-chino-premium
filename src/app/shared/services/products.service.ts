import { Injectable, signal } from '@angular/core';
import { ProductDto } from '@shared/proxies/products.proxie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = signal<ProductDto[]>([]);

  onCategory: Subject<ProductDto> = new Subject<ProductDto>();

}
