import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private destroyRef = inject(DestroyRef);

  @Input({ required: true }) id: string = 'awdaw';

  constructor() { }

  ngOnInit() {
    this.getCategoryInfo();
  }

  getCategoryInfo(): void {
    this.categoriesProxy.get(this.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (category) => {
          console.log({ category });
        }
      });
  }

}
