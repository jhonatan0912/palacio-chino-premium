import { Component, OnInit, inject, signal } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { AddressesService } from '@profile/services/addresses.service';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { ViewComponent } from 'pc-core';
import { AddressDto, AddressesProxy } from 'pc-proxies';
import { finalize } from 'rxjs';
import { AddressesListItemComponent } from "./addresses-list-item/addresses-list-item.component";

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

  busy: boolean = false;
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

  onDelete(id: string): void {
    this.busy = true;
    this._addressesProxy.delete(id)
      .pipe(
        finalize(() => this.busy = false)
      ).subscribe({
        next: () => {
          this.addresses.set(this.addresses().filter(x => x.id !== id));
          this._addressesService.addresses.set(this._addressesService.addresses().filter(x => x.id !== id));
        },
        error: (err) => {
          this.notify.error(err.message, 1500);
        }
      });
  }

  onAddAddress(): void {
    this.navigation.forward('/profile/addresses/form/create');
  }

  onBack(): void {
    this.navigation.back('/profile');
  }
}
