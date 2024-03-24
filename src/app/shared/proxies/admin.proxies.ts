import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/index';
import { environment } from '@environments/environment';
import { Observable, map } from 'rxjs';
import { OrderStatus, formatOrderStatus } from './orders.proxie';

@Injectable({
  providedIn: 'root'
})
export class AdminProxy {

  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/admin`;
  }

  login(username: string, password: string): Observable<LoginDto> {
    const body = {
      username,
      password
    };
    return this.http.post(`${this.path}/login`, body).pipe(map((data: any) => new LoginDto().fromJS(data)));
  }

  getOrders(): Observable<AdminGetOrderDto[]> {
    return this.http.get(`${this.path}/orders`).pipe(map((data: any) => data.map((i: any) => new AdminGetOrderDto().fromJS(i))));
  }
}

export class LoginDto {
  username!: string;
  token!: string;

  init(data: any): void {
    if (data) {
      this.username = data.username;
      this.token = data.token;
    }
  }

  fromJS(data: any): LoginDto {
    data = typeof data === 'object' ? data : {};
    const result = new LoginDto();
    result.init(data);
    return result;
  };
}

export class AdminGetOrderDto {
  id!: string;
  user!: GetOrdersResponseUserDto;
  products!: GetOrdersResponseProductDto[];
  createdAt!: string;
  status!: OrderStatus;
  formatedStatus!: string;
  total!: number;

  init(data: any): void {
    if (data) {
      this.id = data.id;
      this.user = data.user ? new GetOrdersResponseUserDto().fromJS(data.user) : <any>undefined;
      this.products = data.products ? data.products.map((i: any) => new GetOrdersResponseProductDto().fromJS(i)) : [];
      this.createdAt = data.createdAt;
      this.status = data.status;
      this.formatedStatus = formatOrderStatus(data.status);
      this.total = data.total;
    }
  }

  fromJS(data: any): AdminGetOrderDto {
    data = typeof data === 'object' ? data : {};
    const result = new AdminGetOrderDto();
    result.init(data);
    return result;
  }
}

export class GetOrdersResponseUserDto {
  name!: string;
  email!: string;

  init(data: any): void {
    if (data) {
      this.name = data.name;
      this.email = data.email;
    }
  }

  fromJS(data: any): GetOrdersResponseUserDto {
    data = typeof data === 'object' ? data : {};
    const result = new GetOrdersResponseUserDto();
    result.init(data);
    return result;
  }
}

export class GetOrdersResponseProductDto {
  image!: string;
  name!: string;
  quantity!: number;
  price!: number;

  init(data: any): void {
    if (data) {
      this.image = data.image;
      this.name = data.name;
      this.quantity = data.quantity;
      this.price = data.price;
    }
  }

  fromJS(data: any): GetOrdersResponseProductDto {
    data = typeof data === 'object' ? data : {};
    const result = new GetOrdersResponseProductDto();
    result.init(data);
    return result;
  }
}