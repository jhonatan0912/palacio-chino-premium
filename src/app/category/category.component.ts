import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CategoriesProxy } from '@shared/proxies/categories.proxies';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  private categoriesProxy = inject(CategoriesProxy);

  @Input({ required: true }) id: string = 'awdaw';

  constructor() { }

  ngOnInit() {
    this.getCategoryInfo();
  }

  getCategoryInfo(): void {
    this.categoriesProxy.get(this.id)
      .subscribe({
        next: (category) => {
          console.log({ category });
        }
      });
  }

}
