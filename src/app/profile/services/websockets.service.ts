import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Socket, io } from 'socket.io-client';
import { OrdersService } from './orders.service';

@Injectable()
export class WebsocketsService {

  private readonly socket: Socket;
  private readonly ordersService = inject(OrdersService);

  constructor() {
    this.socket = io(environment.api);
  }

  init(): void {
    this.onChangeStatus();
  }

  onChangeStatus(): void {
    this.socket.on('changeStatus', (data: any) => {
      const order = this.ordersService.orders().find(order => order.id === data.id);
      if (!order) return;
      order.status = data.status;
    });
  }
}
