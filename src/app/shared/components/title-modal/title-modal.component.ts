import { Component, OnInit } from '@angular/core';
import { ViewComponent } from '@core/view-component';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'title-modal',
  standalone: true,
  imports: [IonIcon,],
  templateUrl: './title-modal.component.html',
  styleUrls: ['./title-modal.component.scss']
})
export class TitleModalComponent extends ViewComponent {
  
  constructor() {
    super();
  }
}
