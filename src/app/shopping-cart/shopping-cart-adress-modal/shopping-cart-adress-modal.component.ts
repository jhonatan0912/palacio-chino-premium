import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddressesService } from '@profile/services/addresses.service';
import { AddressDto, AddressesProxy } from '@shared/proxies/addresses.proxies';
import { IonRadioGroup, IonRadio, IonButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { FixedFooterComponent } from '@shared/components/fixed-footer/fixed-footer.component';
import { ViewComponent } from '@core/index';

@Component({
  selector: 'shopping-cart-adress-modal',
  standalone: true,
  imports: [IonButton, IonRadio, IonRadioGroup, FormsModule, FixedFooterComponent],
  templateUrl: './shopping-cart-adress-modal.component.html',
  styleUrls: ['./shopping-cart-adress-modal.component.scss']
})
export class ShoppingCartAdressModalComponent extends ViewComponent implements OnInit {

  private readonly _addressesService = inject(AddressesService);
  private readonly _addressesProxy = inject(AddressesProxy);
  private readonly _destroyRef = inject(DestroyRef);

  address: AddressDto = new AddressDto({
    id: '',
    district: '',
    type: '',
    street: '',
    number: '',
    phone: '',
    reference: '',
  });
  addresses = signal<AddressDto[]>([]);

  ngOnInit() {
    this.onGetAddresses();
  }

  onGetAddresses(): void {
    if (this._addressesService.loaded()) {
      this.addresses.set(this._addressesService.addresses());
    } else {
      this._addressesProxy.getAll()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (addresses) => {
            this._addressesService.loaded.set(true);
            this._addressesService.addresses.set(addresses);
            this.addresses.set(addresses);
          }
        });
    }
  }

  onSelect(address: AddressDto): void {
    this.address = address;
  }

  onConfirm(): void {
    if (!this.address.id) {
      this.notify.error('Elige una dirección', 1500);
    } else {
      this.dialog.dismiss(this.address);
    }
  }
}
