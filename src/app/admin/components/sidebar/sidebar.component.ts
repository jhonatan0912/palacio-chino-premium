import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ButtonComponent } from '@lib/button/button.component';
import { AdminSidebarExpandButtonComponent } from './sidebar-expand-button/sidebar-expand-button.component';
import { AdminSidebarOptionComponent, SidebarOption } from './sidebar-option/sidebar-option.component';
import { ADMIN_TOKEN, ViewComponent } from 'pc-core';


@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [NgClass, IonIcon, AdminSidebarOptionComponent, AdminSidebarExpandButtonComponent, ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends ViewComponent implements OnInit {

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

  currentOptionId!: string;
  options: SidebarOption[] = [
    { id: 'home', name: 'Dashboard', icon: '' },
    { id: 'categories', name: 'Categorias', icon: '' },
    // { id: 'users', name: 'Usuarios', icon: '' },
    { id: 'products', name: 'Productos', icon: '' },
    { id: 'orders', name: 'Ordenes', icon: '' },
  ];

  ngOnInit(): void {
    const path = window.location.pathname;
    this.currentOptionId = path.split('/').pop() || this.options[0].id;
  }

  onToggle(): void {
    this.expanded = !this.expanded;
  }

  onOptionSelected(id: string): void {
    this.currentOptionId = id;
    this.navigation.forward(`/admin-dashboard/${id}`);
  }

  onLogout(): void {
    localStorage.removeItem(ADMIN_TOKEN);
    this.navigation.forward('menu');
  }
}
