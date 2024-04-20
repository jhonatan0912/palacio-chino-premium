import { Component, OnInit, inject } from '@angular/core';
import { AddressesListComponent } from './addresses-list/addresses-list.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [AddressesListComponent, AddressFormComponent],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss'
})
export class AddressesComponent implements OnInit {

  private readonly _title = inject(Title);

  ngOnInit(): void {
    this._title.setTitle('Mis direcciones');
  }
}
