import { Injectable, inject } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private platform = inject(Platform);

  get screen(): string {
    if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobile')) {
      return 'mobile';
    } else if (this.platform.is('tablet')) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }
}
