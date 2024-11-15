import { Injectable, signal } from '@angular/core';
import { ProductDto } from 'pc-proxies';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = signal<ProductDto[]>([]);

  onCategory: Subject<ProductDto> = new Subject<ProductDto>();

}
