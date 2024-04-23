import { Component } from '@angular/core';
import { IonSkeletonText } from "@ionic/angular/standalone";
import { StoreMapComponent } from '@shared/components/store-map/store-map.component';
import { ViewComponent } from 'pc-core';

@Component({
  selector: 'app-establishments',
  standalone: true,
  imports: [IonSkeletonText, StoreMapComponent],
  templateUrl: './establishments.component.html',
  styleUrl: './establishments.component.scss'
})
export class EstablishmentsComponent extends ViewComponent {

  onHome(): void {
    this.navigation.forward('/');
  }
}
