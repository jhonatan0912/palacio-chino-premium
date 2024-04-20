import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, computed, inject, input, model, signal } from '@angular/core';
import { SrcImagePipe } from '@shared/pipes/srcImage.pipe';
import { CategoriesService } from '@shared/services/categories.service';
import { CategoryDto } from 'pc-proxies';


@Component({
  selector: 'category-menu',
  standalone: true,
  imports: [NgClass, SrcImagePipe],
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent {

  private readonly _categoriesService = inject(CategoriesService);

  category = input.required<CategoryDto>();
  selectedId = computed<string>(() => this._categoriesService.selectedId());

  @Output() onAction: EventEmitter<string> = new EventEmitter();
}
