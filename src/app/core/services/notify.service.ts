import { Injectable, inject } from '@angular/core';
import { ToastController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { alertCircleOutline, checkmarkCircleOutline, informationCircleOutline } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class AppNotifyService {

  private readonly _toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ alertCircleOutline, checkmarkCircleOutline, informationCircleOutline });
  }

  async success(message: string, duration: number): Promise<void> {
    const toast = await this._toastCtrl.create({
      color: 'success',
      message: message,
      duration: duration,
      position: 'bottom',
      icon: 'checkmark-circle-outline',
    });
    toast.present();
  }

  async info(message: string, duration: number): Promise<void> {
    const toast = await this._toastCtrl.create({
      color: 'primary',
      message: message,
      duration: duration,
      position: 'bottom',
      icon: 'information-circle-outline',
    });
    toast.present();
  }

  async warning(message: string, duration: number): Promise<void> {
    const toast = await this._toastCtrl.create({
      color: 'warning',
      message: message,
      duration: duration,
      position: 'bottom',
      icon: 'alert-circle-outline',
    });
    toast.present();
  }

  async error(message: string, duration: number): Promise<void> {
    const toast = await this._toastCtrl.create({
      color: 'danger',
      message: message,
      duration: duration,
      position: 'bottom',
      icon: 'alert-circle-outline',
    });

    toast.present();
  }

}
