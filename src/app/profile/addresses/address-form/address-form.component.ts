import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonFab, IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { AddressesService } from '@profile/services/addresses.service';
import { FixedFooterComponent } from '@shared/components/fixed-footer/fixed-footer.component';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { InputValidatorDirective, ViewComponent } from 'pc-core';
import { AddressDto, AddressesProxy } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'address-form',
  standalone: true,
  imports: [
    ButtonComponent,
    FixedFooterComponent,
    HeaderMobileComponent,
    InputValidatorDirective,
    IonFab,
    IonIcon,
    IonSpinner,
    ReactiveFormsModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends ViewComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _addressesProxy = inject(AddressesProxy);
  private readonly _addressesService = inject(AddressesService);

  title: string = '';
  action: 'create' | 'edit' = 'create';
  busy: boolean = false;
  form = new FormGroup({
    district: new FormControl('Distrito', Validators.required),
    type: new FormControl('Tipo de lugar', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.pattern('^[0-9]*$')),
    phone: new FormControl('', Validators.required),
    reference: new FormControl(''),
  });

  ngOnInit() {
    const { action } = this._activatedRoute.snapshot.params;
    this._activatedRoute.queryParams
      .subscribe({
        next: ({ id }) => {
          if (!id) return;
          const { id: _, ...rest } = this._addressesService.addresses().find(address => address.id === id) as AddressDto;
          this.form.setValue(rest);
        }
      });
    this.action = action;
    action === 'edit'
      ? this.title = 'Editar'
      : this.title = 'Crear';
  }

  onAddresses(): void {
    this.navigation.forward('/profile/addresses');
  }

  addAddress(): void {
    const { district, type, street, number, phone, reference } = this.form.value;
    this.onCreate(district!, type!, street!, number!, phone!, reference!);
  }

  onSubmit(): void {
    const { district, type, street, number, phone, reference } = this.form.value;
    if (this.action === 'create') {
      this.onCreate(district!, type!, street!, number!, phone!, reference!);
    } else {
      this.onUpdate(district!, type!, street!, number!, phone!, reference!);
    }
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
          this.onRedirect();
        }
      });
  }

  onUpdate(district: string, type: string, street: string, number: string, phone: string, reference: string): void {
    const { id } = this._activatedRoute.snapshot.queryParams;
    this._addressesProxy.update(
      id!,
      district!,
      type!,
      street!,
      number!,
      phone!,
      reference!
    ).subscribe({
      next: (response) => {
        this._addressesService.addresses.update((prev) => prev.map((address) => address.id === id ? response : address));
        this.onRedirect();
      }
    });
  }

  onRedirect(): void {
    const { redirect } = this._activatedRoute.snapshot.queryParams;
    if (redirect) {
      this.navigation.forward(redirect);
      return;
    } else {
      this.navigation.back('/profile/addresses');
    }
  }

  onReset(): void {
    this.form.reset();
  }

  onBack(): void {
    this.navigation.back('/profile/addresses');
  }
}
