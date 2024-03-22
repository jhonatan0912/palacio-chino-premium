import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppTabService {

  visibility = signal<boolean>(true);

  show(): void {
    this.visibility.set(true);
  }

  hide(): void {
    this.visibility.set(false);
  }
}
