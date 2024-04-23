import { Component, EventEmitter, Output } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { ViewComponent } from 'pc-core';

@Component({
  selector: 'title-modal',
  standalone: true,
  imports: [IonIcon,],
  templateUrl: './title-modal.component.html',
  styleUrls: ['./title-modal.component.scss']
})
export class TitleModalComponent extends ViewComponent {

  @Output() onDismiss = new EventEmitter<void>();
}
