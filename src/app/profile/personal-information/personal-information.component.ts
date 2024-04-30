import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSpinner, IonIcon } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { InputValidatorDirective, ViewComponent } from 'pc-core';
import { AuthProxy } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [IonIcon,
    IonSpinner,
    ButtonComponent,
    FormsModule,
    NgClass,
    InputValidatorDirective,
    HeaderMobileComponent,
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent extends ViewComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _authProxy = inject(AuthProxy);

  busy: boolean = false;
  fullName: string = '';
  email: string = '';
  phone: string = '';
  validFields = {
    email: false,
    phone: false,
  };

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
        const { redirect } = this._activatedRoute.snapshot.queryParams;
        if (redirect) {
          this.notify.success('Información actualizada correctamente', 1500);
          this.navigation.forward(redirect);
        } else {
          this.notify.success('Información actualizada correctamente', 1500);
        }
      }
    });
  }

  onSetInfo(): void {
    this.phone = this.session.user?.phone ? this.session.user.phone : '';
    this.fullName = this.session.user?.fullName ? this.session.user.fullName : '';
    this.email = this.session.user?.email ? this.session.user.email : '';
  }

  valueChanges(): boolean {
    return this.fullName !== this.session?.user?.fullName
      || this.email !== this.session?.user.email
      || this.phone !== this.session?.user.phone;
  }

  areValidFields(): boolean {
    console.log(this.fullName.length > 5);
    console.log(this.validFields.email);
    console.log(this.validFields.phone);
    return this.fullName.length > 5 && this.validFields.email && this.validFields.phone;
  }

  onBack(): void {
    this.navigation.back('/profile');
  }
}
