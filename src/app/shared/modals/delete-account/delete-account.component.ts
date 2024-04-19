import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { ViewComponent } from 'pc-core';
import { AuthProxy } from 'pc-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'delete-account',
  standalone: true,
  imports: [IonSpinner, IonIcon],
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountModalComponent extends ViewComponent {

  private readonly _authProxy = inject(AuthProxy);
  private readonly _authService = inject(AuthService);

  busy: boolean = false;

  constructor() {
    super();
  }

  onDeleteAccount(): void {
    this.busy = true;

    this._authProxy.deleteAccount()
      .pipe(finalize(() => this.busy = false))
      .subscribe({
        next: () => {
          this.session.clear();
          this._authService.logout();
          this.dialog.dismiss('delete');
          this.navigation.forward('/home');
        }
      });
  }
}
