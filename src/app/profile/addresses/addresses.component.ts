import { Component } from '@angular/core';
import { AddressesListComponent } from './addresses-list/addresses-list.component';
import { AddressFormComponent } from './address-form/address-form.component';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [AddressesListComponent, AddressFormComponent],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss'
})
export class AddressesComponent { }
