import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { IonRadioGroup, IonRadio, IonSpinner } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';
import { AddressesService } from '@profile/services/addresses.service';
import { AddressDto, AddressesProxy } from '@shared/proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-choose-address',
  standalone: true,
  imports: [IonSpinner, IonRadio, FormsModule, IonRadioGroup, ButtonComponent],
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.scss']
})
export class ChooseAddressComponent implements OnInit {

  private readonly _addressesProxy = inject(AddressesProxy);
  private readonly _addressesService = inject(AddressesService);
  private readonly _destroyRef = inject(DestroyRef);

  busy: boolean = false;
  addresses = signal<AddressDto[]>([]);
  address: AddressDto = new AddressDto({
    id: '',
    district: '',
    type: '',
    street: '',
    number: '',
    phone: '',
    reference: '',
  });

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
        )
        .subscribe({
          next: (addresses) => {
            this.addresses.set(addresses);
            this._addressesService.loaded.set(true);
            this._addressesService.addresses.set(addresses);
          }
        });
    }
  }

  onSelect(address: AddressDto): void {
    this.address = address;
  }

  onAddAddress(): void { }

  onContinue(): void {
    if (!this.address.id) return;
  }
}
