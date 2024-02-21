import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { environment } from '@enviroments/environment.development';
import { CategoryDto } from '@shared/proxies/categories.proxies';

export const getIconUrl = ({ icon, ...rest }: CategoryDto) => {
  const iconUrl = `${environment.api}/${icon}`;
  return { icon: iconUrl, ...rest };
};

@Component({
  selector: 'category-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent {

  category = input.required({ alias: 'category', transform: getIconUrl });
  selectedId = input<string>();

  @Output() onAction: EventEmitter<string> = new EventEmitter();
}
