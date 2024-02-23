import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { CategoryIconPipe } from '@shared/pipes/categoryIcon.pipe';
import { CategoryDto } from '@shared/proxies/categories.proxies';


@Component({
  selector: 'category-menu',
  standalone: true,
  imports: [NgClass, CategoryIconPipe],
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent {

  category = input.required<CategoryDto>();
  selectedId = input<string>();

  @Output() onAction: EventEmitter<string> = new EventEmitter();
}
