import { Injectable, signal } from '@angular/core';
import { GetOrderDto } from 'pc-proxies';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  loaded = signal<boolean>(false);

  orders = signal<GetOrderDto[]>([]);
}
