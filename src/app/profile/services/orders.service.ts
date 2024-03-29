import { Injectable, signal } from '@angular/core';
import { GetOrderDto } from '@shared/proxies/orders.proxie';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  loaded = signal<boolean>(false);

  orders = signal<GetOrderDto[]>([]);
}
