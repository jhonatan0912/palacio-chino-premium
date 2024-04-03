import { Component, input, model, output } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { AddressDto } from '@shared/proxies';

@Component({
  selector: 'addresses-list-item',
  standalone: true,
  imports: [IonSpinner, IonIcon,],
  templateUrl: './addresses-list-item.component.html',
  styleUrls: ['./addresses-list-item.component.scss']
})
export class AddressesListItemComponent extends ViewComponent {

  address = input.required<AddressDto>();
  busy = model.required<boolean>();

  onDelete = output<string>();

  constructor() {
    super();
  }

  onEdit(id: string): void {
    this.navigation.forward('/profile/addresses/form/edit', { id });
  }
}
