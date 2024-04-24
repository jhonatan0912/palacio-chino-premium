import { Injectable, signal } from '@angular/core';
import { AdminGetOrderDto } from 'pc-proxies';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  orders = signal<AdminGetOrderDto[]>([]);
}
