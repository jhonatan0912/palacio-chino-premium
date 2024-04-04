import { Component, OnInit, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckoutChooseAddressComponent } from '@checkout/modals/checkout-choose-address/checkout-choose-address.component';
import { ViewComponent } from '@core/view-component';
import { IonRadio, IonRadioGroup, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';
import { AddressDto } from '@shared/proxies';

@Component({
  selector: 'checkout-address',
  standalone: true,
  imports: [IonIcon, IonSpinner, IonRadio, FormsModule, IonRadioGroup, ButtonComponent],
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent extends ViewComponent {

  address = model.required<AddressDto>();
  createOrderBusy: boolean = false;

  constructor() {
    super();
  }

  onSelectAddress(): void {
    this.dialog.showWithData({
      component: CheckoutChooseAddressComponent,
      componentProps: {
        address: this.address()
      }
    }).then(res => {
      if (!res || res === 'cancel') return;
      this.address.set(res);
    });
  }
}