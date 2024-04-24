import { Component, model } from '@angular/core';
import { OrderStatus } from 'pc-proxies';

interface StatusItem {
  id: OrderStatus;
  name: string;
}

@Component({
  selector: 'admin-orders-filter',
  templateUrl: './orders-filter.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./orders-filter.component.scss']
})
export class AdminOrdersFilterComponent {

  status = model.required<OrderStatus | 'all'>();

  states: StatusItem[] = [
    { id: 'pending', name: 'Pendiente' },
    { id: 'progress', name: 'En preparación' },
    { id: 'completed', name: 'Completado' },
    { id: 'canceled', name: 'Anulado' },
  ];

  onSelecStatus(status: OrderStatus | 'all'): void {
    this.status.set(status);
  }
}