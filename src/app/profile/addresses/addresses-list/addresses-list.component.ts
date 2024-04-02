import { Component, OnInit, inject, signal } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { AddressesService } from '@profile/services/addresses.service';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { AddressesListItemComponent } from "./addresses-list-item/addresses-list-item.component";
import { AddressDto, AddressesProxy } from '@shared/proxies';

@Component({
  selector: 'addresses-list',
  standalone: true,
  imports: [IonIcon, HeaderMobileComponent, ButtonComponent, AddressesListItemComponent],
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.scss']
})
export class AddressesListComponent extends ViewComponent implements OnInit {

  private readonly _addressesProxy = inject(AddressesProxy);
  private readonly _addressesService = inject(AddressesService);

  addresses = signal<AddressDto[]>([]);

  ngOnInit(): void {
    this.onGetAddresses();
  }

  onGetAddresses(): void {
    if (this._addressesService.loaded()) {
      this.addresses.set(this._addressesService.addresses());
    } else {
      this._addressesProxy.getAll()
        .subscribe({
          next: (addresses) => {
            this.addresses.set(addresses);
            this._addressesService.addresses.set(addresses);
            this._addressesService.loaded.set(true);
          }
        });
    }
  }

  onAddAddress(): void {
    this.navigation.forward('/profile/addresses/add');
  }

  onBack(): void {
    this.navigation.back('/profile');
  }
}
