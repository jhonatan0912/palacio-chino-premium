import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'category-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent {

  @Input() category!: CategoryDto;
  @Input() selectedId!: string;

  @Output() onAction: EventEmitter<string> = new EventEmitter();

  get imageUrl(): string {
    const baseUrl = environment.api;

    return `${baseUrl}/${this.category.icon}`;
  }

}
