import { Component, EventEmitter, Output, model } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'sidebar-expand-button',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './sidebar-expand-button.component.html',
  styleUrls: ['./sidebar-expand-button.component.scss']
})
export class AdminSidebarExpandButtonComponent {

  expanded = model.required();

  @Output() onToggle = new EventEmitter<void>();
}
