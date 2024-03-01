import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'addresses-list',
  standalone: true,
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.scss']
})
export class AddressesListComponent extends ViewComponent {

  addAddresses() {
    this.navigation.forward('/profile/register-address');
  }

}
