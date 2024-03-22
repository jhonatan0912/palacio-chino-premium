import { Injectable, inject } from '@angular/core';
import { Platform } from '@ionic/angular';

export enum Screen {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop'
}


@Injectable({
  providedIn: 'root'
})
export class AppScreenService {

  private readonly _platform = inject(Platform);

  get screen(): Screen {
    if (this._platform.is('android') || this._platform.is('ios') || this._platform.is('mobile')) {
      return Screen.Mobile;
    } else if (this._platform.is('tablet')) {
      return Screen.Tablet;
    } else {
      return Screen.Desktop;
    }
  }
}
