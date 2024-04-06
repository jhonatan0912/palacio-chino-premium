import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputValidatorDirective } from '@core/directives/inputValidator.directive';
import { ViewComponent } from '@core/view-component';
import { IonFab, IonSpinner, IonIcon } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { AddressesService } from '@profile/services/addresses.service';
import { FixedFooterComponent } from '@shared/components/fixed-footer/fixed-footer.component';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { AddressDto, AddressesProxy } from '@shared/proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'address-form',
  standalone: true,
  imports: [IonIcon, IonSpinner, IonFab, ButtonComponent, ReactiveFormsModule, InputValidatorDirective, HeaderMobileComponent, FixedFooterComponent],
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

  constructor() {
    super();
  }

  ngOnInit() {
    const { action } = this._activatedRoute.snapshot.params;
    this._activatedRoute.queryParams
      .subscribe({
        next: ({ id }) => {
          if (!id) return;
          const { id: _, ...rest } = this._addressesService.addresses().find(address => address.id === id) as AddressDto;
          console.log(rest);
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
          this.onBack();
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
        this.onBack();
      }
    });
  }

  onReset(): void {
    this.form.reset();
  }

  onBack(): void {
    this.navigation.back('/profile/addresses');
  }
}
