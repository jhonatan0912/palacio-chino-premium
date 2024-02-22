import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, input, model } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";

export interface SidebarOption {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'sidebar-option',
  standalone: true,
  imports: [NgClass, IonIcon],
  templateUrl: './sidebar-option.component.html',
  styleUrls: ['./sidebar-option.component.scss']
})
export class AdminSidebarOptionComponent {

  option = input.required<SidebarOption>();
  expanded = input.required<boolean>();
  currentOptionId = model.required<string>();

  @Output() onOptionClicked = new EventEmitter<string>();

  onClick(optionId: string): void {
    this.currentOptionId.update((value) => optionId);
    this.onOptionClicked.emit(optionId);
  }
}
