import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppAlertService {

  private readonly _toastCtrl = inject(ToastController);

  async success(message: string, duration: number): Promise<void> {
    const toast = await this._toastCtrl.create({
      color: 'success',
      message: message,
      duration: duration,
      position: 'top',
      cssClass: ['alert']
    });

    toast.present();
  }

  async info(message: string, duration: number): Promise<void> {
    const toast = await this._toastCtrl.create({
      color: 'primary',
      message: message,
      duration: duration,
      position: 'top',
      cssClass: ['alert']
    });

    toast.present();
  }


  async warning(message: string, duration: number): Promise<void> {
    const toast = await this._toastCtrl.create({
      color: 'warning',
      message: message,
      duration: duration,
      position: 'top',
      cssClass: ['alert']
    });

    toast.present();
  }

  async error(message: string, duration: number): Promise<void> {
    const toast = await this._toastCtrl.create({
      color: 'danger',
      message: message,
      duration: duration,
      position: 'top',
      cssClass: ['alert']
    });

    toast.present();
  }
}
