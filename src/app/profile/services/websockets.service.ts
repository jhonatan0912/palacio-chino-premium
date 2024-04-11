import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Socket, io } from 'socket.io-client';
import { OrdersService } from './orders.service';
import { OrderDetailDto, formatOrderStatus } from '@shared/proxies';

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
      order.formatedStatus = formatOrderStatus(data.status);
    });
  }

  changeOrderDetailStatus(order: OrderDetailDto): void {
    this.socket.on('changeStatus', (data: any) => {
      if (order.id !== data.id) return;
      order.status = data.status;
      order.formatedStatus = formatOrderStatus(data.status);
    });
  }
}
