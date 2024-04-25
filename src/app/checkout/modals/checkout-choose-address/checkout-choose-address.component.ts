import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonRadio, IonSpinner, IonRadioGroup, IonIcon } from "@ionic/angular/standalone";
import { AddressesService } from '@profile/services/addresses.service';
import { TitleModalComponent } from '@shared/components/title-modal/title-modal.component';
import { ViewComponent } from 'pc-core';
import { AddressDto, AddressesProxy } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'checkout-choose-address',
  standalone: true,
  imports: [IonIcon, IonSpinner, IonRadio, IonRadioGroup, FormsModule, TitleModalComponent],
  templateUrl: './checkout-choose-address.component.html',
  styleUrls: ['./checkout-choose-address.component.scss']
})
export class CheckoutChooseAddressComponent extends ViewComponent implements OnInit {

  private readonly _addressesProxy = inject(AddressesProxy);
  private readonly _addressesService = inject(AddressesService);
  private readonly _destroyRef = inject(DestroyRef);

  @Input() address!: AddressDto;

  busy: boolean = false;
  createOrderBusy: boolean = false;
  addresses = signal<AddressDto[]>([]);



  ngOnInit() {
    this.onGetAddresses();
  }

  onGetAddresses(): void {
    if (this._addressesService.loaded()) {
      this.addresses.set(this._addressesService.addresses());
    } else {
      this.busy = true;
      this._addressesProxy.getAll()
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.busy = false)
        ).subscribe({
          next: (addresses) => {
            this.addresses.set(addresses);
            this._addressesService.loaded.set(true);
            this._addressesService.addresses.set(addresses);
          }
        });
    }
  }

  onSelect(address: AddressDto): void {
    if (!address.id) return;
    this.address = address;
    this.dialog.dismiss(address);
  }

  onAddAddress(): void {
    this.dialog.dismiss('cancel');
    setTimeout(() => this.navigation.forward('/profile/addresses/form/create'), 500);

  }
}
