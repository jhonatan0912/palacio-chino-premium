import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AppNavigationService } from '@core/index';
import { IonIcon } from '@ionic/angular/standalone';
import { AdminSidebarOptionComponent, SidebarOption } from './sidebar-option/sidebar-option.component';


@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [NgClass, IonIcon, AdminSidebarOptionComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

  private navigation = inject(AppNavigationService);
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

  options: SidebarOption[] = [
    { id: 'categories', name: 'Categorias', icon: '' },
    { id: 'users', name: 'Usuarios', icon: '' },
    { id: 'products', name: 'Productos', icon: '' },
    { id: 'orders', name: 'Ordenes', icon: '' },
  ];
  currentOptionId: string = this.options[0].id;

  onToggle(): void {
    this.expanded = !this.expanded;
  }

  onOptionClicked(id: string): void {
    this.navigation.forward(`/admin-dashboard/${id}`);
  }

  onLogout(): void {
    localStorage.removeItem('admin-token');
    this.navigation.forward('menu');
  }
}
