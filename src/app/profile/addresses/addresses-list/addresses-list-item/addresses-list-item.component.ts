import { Component, OnInit, inject, input } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from "@ionic/angular/standalone";
import { AddressesService } from '@profile/services/addresses.service';
import { AddressDto, AddressesProxy } from '@shared/proxies/addresses.proxies';

@Component({
  selector: 'addresses-list-item',
  standalone: true,
  imports: [IonIcon,],
  templateUrl: './addresses-list-item.component.html',
  styleUrls: ['./addresses-list-item.component.scss']
})
export class AddressesListItemComponent extends ViewComponent {

  private readonly _addressesProxy = inject(AddressesProxy);
  private readonly _addressesService = inject(AddressesService);

  address = input.required<AddressDto>();

  constructor() {
    super();
  }

  onEdit(id: string): void {
    this.navigation.forward('/profile/addresses/form/edit', { id });
  }

  onDelete(): void {
    this._addressesProxy.delete(this.address().id!)
      .subscribe({
        next: (response) => {
          this._addressesService.addresses.update((prev) => prev.filter(address => address.id !== response.id));
        }
      });
  }

}
