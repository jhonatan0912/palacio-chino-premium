import { Injectable, inject } from '@angular/core';
import { Params } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  private readonly _navCtrl = inject(NavController);

  forward(path: string, queryParams?: Params): void {
    this._navCtrl.navigateForward(path, { queryParams });
  }

  back(path: string, queryParams?: Params): void {
    this._navCtrl.navigateBack(path, { queryParams });
  }
}
