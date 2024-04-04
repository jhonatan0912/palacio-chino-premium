import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from './components/aside/aside.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { AddressDto } from '@shared/proxies';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterOutlet, AsideComponent, CheckoutAddressComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  address: AddressDto = new AddressDto({
    id: '',
    district: '',
    type: '',
    street: '',
    number: '',
    phone: '',
    reference: '',
  });
}
