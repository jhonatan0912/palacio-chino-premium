import { Injectable, inject } from '@angular/core';
import { AppHttpService } from '@core/index';
import { environment } from '@environments/environment';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersProxy {
  private http = inject(AppHttpService);

  get path(): string {
    return `${environment.api}/api/v1/orders`;
  }

  create(products: CreateOrderDto[]): Observable<CreateOrderResponseDto> {
    const body = {
      products: products
    };

    return this.http.post(this.path, body).pipe(mergeMap((data: any) => of(new CreateOrderResponseDto().fromJS(data))));
  };
}

export class CreateOrderDto {
  id!: string;
  quantity!: number;

  init(data: any): void {
    if (data) {
      this.id = data.id;
      this.quantity = data.quantity;
    }
  }

  fromJS(data: any): CreateOrderDto {
    return Object.assign(this, data);
  }
}

export class CreateOrderResponseDto {
  user!: CreateOrderResponseUserDto;
  products!: CreateOrderDto[];
  total!: number;

  init(data: any): void {
    if (data) {
      this.user = data.user;
      this.products = data.products;
      this.total = data.total;
    }
  }

  fromJS(data: any): CreateOrderResponseDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateOrderResponseDto();
    result.init(data);
    return result;
  }
}

export class CreateOrderResponseUserDto {
  fullName!: string;
  email!: string;

  init(data: any): void {
    if (data) {
      this.fullName = data.fullName;
      this.email = data.email;
    }
  }

  fromJS(data: any): CreateOrderResponseUserDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateOrderResponseUserDto();
    result.init(data);
    return result;
  }
}