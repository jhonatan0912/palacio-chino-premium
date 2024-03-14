import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class WebsocketsService {

  private readonly socket: Socket;

  constructor() {
    this.socket = io('http://192.168.1.79:3000');
  }

  init(): void {
    this.onOrder();
  }

  onOrder(): void {
    this.socket.on('newOrder', (order: any) => {
      console.log(order);
    });
  }
}
