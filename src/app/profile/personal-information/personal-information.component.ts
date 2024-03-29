import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '@core/view-component';
import { ButtonComponent } from '@lib/button/button.component';
import { AuthProxy } from '@shared/proxies/auth.proxies';
import { finalize } from 'rxjs';
import { IonSpinner } from "@ionic/angular/standalone";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [IonSpinner, ButtonComponent, FormsModule, NgClass],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent extends ViewComponent implements OnInit {

  private readonly _authProxy = inject(AuthProxy);

  busy: boolean = false;
  fullName: string = '';
  email: string = '';
  phone: string = '';

  ngOnInit(): void {
    this.onSetInfo();
  }

  onUpdate(): void {
    if (!this.areValidFields()) return;
    this.busy = true;

    this._authProxy.updateInfo(
      this.fullName,
      this.email,
      this.phone
    ).pipe(
      finalize(() => this.busy = false)
    ).subscribe({
      next: (user) => {
        this.session.setUser(user);
        this.notify.success('Información actualizada correctamente', 1500);
      }
    });
  }

  onSetInfo(): void {
    this.phone = this.session.user?.phone ? this.session.user.phone : '';
    this.fullName = this.session.user?.fullName ? this.session.user.fullName : '';
    this.email = this.session.user?.email ? this.session.user.email : '';
  }

  valueChanges(): boolean {
    return (this.fullName !== this.session.user?.fullName ||
      this.email !== this.session.user?.email ||
      this.phone !== this.session.user?.phone) && this.areValidFields();
  }

  areValidFields(): boolean {
    return this.fullName !== '' &&
      this.fullName.length > 5 &&
      this.email !== '' &&
      this.phone !== '';
  }
}
