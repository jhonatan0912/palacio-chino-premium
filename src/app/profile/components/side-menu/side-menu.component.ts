import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ViewComponent } from '@core/view-component';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';

interface SideMenuOption {
  id: string;
  name: string;
  route: string;
}

@Component({
  selector: 'profile-side-menu',
  standalone: true,
  imports: [IonButton, IonIcon, ButtonComponent],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent extends ViewComponent {

  private authService = inject(AuthService);

  options: SideMenuOption[] = [
    { id: '1', name: 'Datos Personales', route: '/profile/personal-information' },
    { id: '2', name: 'Mis direcciones', route: '/profile/addresses' },
    { id: '3', name: 'Mis pedidos', route: '/profile/orders' },
  ];

  onAction(route: string): void {
    this.navigation.forward(route);
  }

  onLogout(): void {
    this.authService.logout();
    this.session.clear();
    this.navigation.forward('/home');
  }
}
