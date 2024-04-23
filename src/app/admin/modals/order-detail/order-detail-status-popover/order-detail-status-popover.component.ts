import { Component } from '@angular/core';
import { StateOption } from '@shared/interfaces';
import { ViewComponent } from 'pc-core';
import { OrderStatus } from 'pc-proxies';

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
    { id: 'canceled', name: 'Anular' }
  ];

  onSelect(id: OrderStatus): void {
    this.popup.dismiss(id);
  }
}
