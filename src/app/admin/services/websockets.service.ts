import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { AdminOrdersService } from './orders.service';
import { AdminGetOrderDto } from '@shared/proxies/admin.proxies';
import { environment } from '@environments/environment.development';

@Injectable()
export class AdminWebsocketsService {

  private readonly socket: Socket;
  private readonly adminOrdersService = inject(AdminOrdersService);

  constructor() {
    console.log(environment.api);
    this.socket = io(environment.api);
  }

  init(): void {
    this.onOrder();
  }

  onOrder(): void {
    this.socket.on('newOrder', (data: AdminGetOrderDto) => {
      const order = new AdminGetOrderDto().fromJS(data);
      this.adminOrdersService.orders.update((prev) => [order, ...prev]);
    });
  }
}
