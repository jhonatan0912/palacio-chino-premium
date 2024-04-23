import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { IonIcon, IonItemOptions } from "@ionic/angular/standalone";
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { DeleteAccountModalComponent } from '@shared/modals';
import { ViewComponent } from 'pc-core';

@Component({
  standalone: true,
  imports: [RouterOutlet, IonIcon, IonItemOptions, HeaderMobileComponent],
  templateUrl: './profile-mobile.component.html',
  styleUrls: ['./profile-mobile.component.scss']
})
export class ProfileMobileComponent extends ViewComponent {

  private readonly _authService = inject(AuthService);

  options = [
    {
      name: 'Pedidos',
      icon: 'pricetags-outline',
      class: '',
      method: () => this.navigation.forward('/profile/orders')
    },
    {
      name: 'Direcciones',
      icon: 'map-outline',
      class: '',
      method: () => this.navigation.forward('/profile/addresses')
    },
    {
      name: 'Cerrar sesión',
      icon: 'log-out-outline',
      class: 'text-delete',
      method: () => this.onLogout()
    },
    {
      name: 'Eliminar cuenta',
      icon: 'alert-circle-outline',
      class: 'text-delete mt-auto	justify-center',
      method: () => this.onDeleteAccount()
    },
  ];

  onDeleteAccount(): void {
    this.dialog.showWithData({
      component: DeleteAccountModalComponent,
      cssClass: ['delete-account']
    });
  }

  onLogout(): void {
    this._authService.logout();
    this.session.clear();
    this.navigation.forward('/home');
  }
}