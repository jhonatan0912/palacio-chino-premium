import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { AdminOrdersService } from './orders.service';
import { AdminGetOrderDto } from '@shared/proxies/admin.proxies';

@Injectable()
export class WebsocketsService {

  private readonly socket: Socket;
  private readonly adminOrdersService = inject(AdminOrdersService);

  constructor() {
    this.socket = io('http://192.168.1.79:3000');
  }

  init(): void {
    this.onOrder();
  }

  onOrder(): void {
    this.socket.on('newOrder', (data: AdminGetOrderDto) => {
      const order = new AdminGetOrderDto().fromJS(data);
      this.adminOrdersService.orders.update((prev) => [order, ...prev]);
      console.log(data);
    });
  }
}
