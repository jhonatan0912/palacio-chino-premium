import { Injectable, inject } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AppDialogService {

  private readonly _modalCtrl = inject(ModalController);

  async showWithData(opts: ModalOptions): Promise<any> {
    const modal = await this._modalCtrl.create(opts);
    modal.present();

    const data = await modal.onDidDismiss();
    if (!data) return;

    return data.data;
  }

  dismiss(data: any): void {
    this._modalCtrl.dismiss(data);
  }
}
