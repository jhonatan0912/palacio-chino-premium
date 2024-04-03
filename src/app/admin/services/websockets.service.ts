import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { AdminOrdersService } from './orders.service';
import { environment } from '@environments/environment';
import { AppAlertService } from '@core/index';
import { AdminGetOrderDto } from '@shared/proxies';


@Injectable()
export class AdminWebsocketsService {

  private readonly _socket: Socket;
  private readonly _adminOrdersService = inject(AdminOrdersService);
  private readonly _alertService = inject(AppAlertService);

  constructor() {
    this._socket = io(environment.api);
  }

  init(): void {
    this.onOrder();
  }

  onOrder(): void {
    this._socket.on('newOrder', (data: AdminGetOrderDto) => {
      const { street, number, district } = data.address;
      const message = `Nuevo pedido de: ${data.user.name}. ${street} ${number}, ${district}`;
      this.presentAlert(message);
      this.updateOrders(data);
    });
  }

  private presentAlert(message: string): void {
    this._alertService.success(message, 3000);
  }

  private updateOrders(order: AdminGetOrderDto): void {
    order = new AdminGetOrderDto().fromJS(order);
    this._adminOrdersService.orders.update((prev) => [order, ...prev]);
  }
}
