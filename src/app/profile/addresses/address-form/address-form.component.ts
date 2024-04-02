import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewComponent } from '@core/view-component';
import { ButtonComponent } from '@lib/button/button.component';
import { AddressesService } from '@profile/services/addresses.service';
import { AddressesProxy } from '@shared/proxies';
import { finalize } from 'rxjs';
import { IonFab, IonSpinner } from "@ionic/angular/standalone";

@Component({
  selector: 'address-form',
  standalone: true,
  imports: [IonSpinner, IonFab, ButtonComponent, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends ViewComponent {

  private readonly _addressesProxy = inject(AddressesProxy);
  private readonly _addressesService = inject(AddressesService);

  busy: boolean = false;
  form = new FormGroup({
    district: new FormControl('Distrito', Validators.required),
    type: new FormControl('Tipo de lugar', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.pattern('^[0-9]*$')),
    phone: new FormControl('', Validators.required),
    reference: new FormControl(''),
  });

  constructor() {
    super();
  }

  onAddresses(): void {
    this.navigation.forward('/profile/addresses');
  }

  addAddress(): void {
    const { district, type, street, number, phone, reference } = this.form.value;
    this.onCreate(district!, type!, street!, number!, phone!, reference!);
  }

  onCreate(district: string, type: string, street: string, number: string, phone: string, reference: string): void {
    this.busy = true;
    this._addressesProxy.create(
      district!,
      type!,
      street!,
      number!,
      phone!,
      reference!
    ).pipe(finalize(() => this.busy = false))
      .subscribe({
        next: (response) => {
          this._addressesService.addresses.update((prev) => [...prev, response.data]);
          this.onBack();
        }
      });
  }

  onBack(): void {
    this.navigation.back('/profile/addresses');
  }
}
