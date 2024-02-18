import { Injectable, inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AppDialogService {

  private readonly modalCtrl = inject(ModalController);

  dismiss(data: any): void {
    this.modalCtrl.dismiss(data);
  }
}
