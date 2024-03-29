import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { OrderStatus } from '@shared/proxies/orders.proxie';

interface StateOption {
  id: OrderStatus,
  name: string;
}

@Component({
  selector: 'rder-detail-status-popover',
  templateUrl: './order-detail-status-popover.component.html',
  styleUrls: ['./order-detail-status-popover.component.scss']
})
export class OrderDetailStatusPopoverComponent extends ViewComponent {

  states: StateOption[] = [
    { id: 'pending', name: 'Pendiente' },
    { id: 'progress', name: 'En progreso' },
    { id: 'completed', name: 'Completado' },
    { id: 'canceled', name: 'Cancelado' }
  ];

  onSelect(id: OrderStatus): void {
    this.popup.dismiss(id);
  }
}
