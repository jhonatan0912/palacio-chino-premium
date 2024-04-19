import { Injectable, inject } from '@angular/core';
import { PopoverController, PopoverOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AppPopoverService {

  private readonly _popoverCtrl = inject(PopoverController);

  dismiss(data: any): void {
    this._popoverCtrl.dismiss(data);
  }

  async showWithData(opts: PopoverOptions): Promise<any> {
    const popover = await this._popoverCtrl.create(opts);
    popover.present();

    const data = await popover.onDidDismiss();
    if (!data) return;

    return data.data;
  }
}
