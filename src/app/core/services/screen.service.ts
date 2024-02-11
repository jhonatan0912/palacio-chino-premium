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
export class ScreenService {

  private platform = inject(Platform);

  get screen(): Screen {
    if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')) {
      return Screen.Mobile;
    } else if (this.platform.is('tablet')) {
      return Screen.Tablet;
    } else {
      return Screen.Desktop;
    }
  }
}
