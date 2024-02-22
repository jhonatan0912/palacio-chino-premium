import { Component, Input, OnInit, inject, input } from '@angular/core';
import { CategoriesProxy } from '@shared/proxies/categories.proxies';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class AdminCategoryFormModalComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);

  @Input() categoryId!: string;

  constructor() { }

  ngOnInit() {
    this.onGetCategory();
  }

  onGetCategory(): void {
    this.categoriesProxy.get(this.categoryId)
      .subscribe({
        next: (category) => {
          console.log({ category });
        },
        error: (err) => console.error(err)
      });
  }

}
