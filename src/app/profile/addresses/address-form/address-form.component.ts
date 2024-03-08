import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { ButtonComponent } from '@lib/button/button.component';

@Component({
  selector: 'address-form',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends ViewComponent {

  goDashboard(): void {
    this.navigation.forward('/profile/addresses');
  }
}
