import { Injectable, signal } from '@angular/core';
import { AdminGetOrderDto } from '@shared/proxies/admin.proxies';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {


  orders = signal<AdminGetOrderDto[]>([]);

}
