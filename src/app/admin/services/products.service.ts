import { Injectable, signal } from '@angular/core';
import { ProductDto } from 'pc-proxies';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  loaded = signal<boolean>(false);

  products = signal<ProductDto[]>([]);
}