import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';
import { ViewComponent } from 'pc-core';

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
    { id: '1', name: 'Mis pedidos', route: '/profile/orders' },
    { id: '2', name: 'Mis direcciones', route: '/profile/addresses' },
    { id: '3', name: 'Datos personales', route: '/profile/personal-information' },
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
