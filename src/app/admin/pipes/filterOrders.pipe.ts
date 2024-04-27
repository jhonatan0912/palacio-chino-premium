import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from 'pc-proxies';

@Pipe({
  name: 'filterOrders',
  standalone: true,
})
export class FilterOrdersPipe implements PipeTransform {

  transform(orders: any[], status: OrderStatus | 'all'): any[] {
    if (status === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === status);
  }

}
