import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

  private _expanded: boolean = true;

  @Input() get expanded(): boolean {
    return this._expanded;
  }

  @Output() expandedChange = new EventEmitter<boolean>();

  set expanded(value: boolean) {
    if (this._expanded !== value) {
      this._expanded = value;
      this.expandedChange.emit(value);
    }
  }

  onToggle() {
    this.expanded = !this.expanded;
  }
}
