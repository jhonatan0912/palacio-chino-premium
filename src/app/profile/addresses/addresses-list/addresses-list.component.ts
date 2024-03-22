import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { ButtonComponent } from '@lib/button/button.component';
import { AddressesListItemComponent } from "./addresses-list-item/addresses-list-item.component";

@Component({
  selector: 'addresses-list',
  standalone: true,
  imports: [ButtonComponent, AddressesListItemComponent],
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.scss']
})
export class AddressesListComponent extends ViewComponent {

  addAddresses() {
    this.navigation.forward('/profile/addresses/add');
  }

}
