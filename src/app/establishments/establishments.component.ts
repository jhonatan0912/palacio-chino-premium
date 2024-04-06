import { Component } from '@angular/core';
import { StoreMapComponent } from '@shared/components/store-map/store-map.component';
import { IonSkeletonText } from "@ionic/angular/standalone";
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'app-establishments',
  standalone: true,
  imports: [IonSkeletonText, StoreMapComponent],
  templateUrl: './establishments.component.html',
  styleUrl: './establishments.component.scss'
})
export class EstablishmentsComponent extends ViewComponent {

  constructor() {
    super();
  }

  onHome(): void {
    this.navigation.forward('/');
  }
}
