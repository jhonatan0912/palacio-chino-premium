import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { AdminOrdersService } from './orders.service';

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
    this.socket.on('newOrder', (order: any) => {
      this.adminOrdersService.orders.update((prev) => [...prev, order]);
      console.log(order);
    });
  }
}
