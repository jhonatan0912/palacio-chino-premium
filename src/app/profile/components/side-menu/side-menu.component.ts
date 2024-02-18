import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ViewComponent } from '@core/view-component';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';

@Component({
  selector: 'profile-side-menu',
  standalone: true,
  imports: [IonButton, IonIcon, ButtonComponent],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent extends ViewComponent {

  private authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
    this.session.clear();
    this.navigation.forward('/home');
  }
}
