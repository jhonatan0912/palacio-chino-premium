import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { CategoryDto } from '@shared/proxies/categories.proxies';


@Component({
  selector: 'category-menu',
  standalone: true,
  imports: [NgClass, SrcImagePipe],
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent {

  category = input.required<CategoryDto>();
  selectedId = input<string>();

  @Output() onAction: EventEmitter<string> = new EventEmitter();
}
