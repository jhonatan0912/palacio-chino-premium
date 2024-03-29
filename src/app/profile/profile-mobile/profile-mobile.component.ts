import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewComponent } from '@core/view-component';
import { IonIcon, IonItemOptions } from "@ionic/angular/standalone";
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, IonIcon, IonItemOptions, HeaderMobileComponent],
  templateUrl: './profile-mobile.component.html',
  styleUrls: ['./profile-mobile.component.scss']
})
export class ProfileMobileComponent extends ViewComponent {


  options = [
    {
      id: '',
      name: 'Pedidos',
      icon: 'pricetags-outline',
      class: '',
      method: () => this.navigation.forward('/profile/orders')
    },
    {
      id: '',
      name: 'Direcciones',
      icon: 'map-outline',
      class: '',
      method: () => this.navigation.forward('/profile/addresses')
    },
    {
      id: '',
      name: 'Eliminar cuenta',
      icon: 'alert-circle-outline',
      class: 'text-delete',
      method: () => this.navigation.forward('')
    },
  ];

  constructor() {
    super();
  }
}