import { Injectable, inject } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AppDialogService {

  private readonly modalCtrl = inject(ModalController);

  async showWithData(opts: ModalOptions): Promise<any> {
    const modal = await this.modalCtrl.create(opts);
    modal.present();

    const data = await modal.onDidDismiss();
    if (!data) return;

    return data.data;
  }

  dismiss(data: any): void {
    this.modalCtrl.dismiss(data);
  }
}
