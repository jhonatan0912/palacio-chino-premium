import { Component, EventEmitter, Output } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'title-mobile',
  standalone: true,
  imports: [IonIcon,],
  templateUrl: './auth-title.component.html',
  styleUrls: ['./auth-title.component.scss']
})
export class TitleMobileComponent {

  @Output() onBack: EventEmitter<void> = new EventEmitter<void>();

}
