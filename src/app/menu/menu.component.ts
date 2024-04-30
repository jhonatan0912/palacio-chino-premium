import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonSpinner } from "@ionic/angular/standalone";
import { ButtonComponent } from '@lib/button/button.component';
import { CategoriesMenuComponent, ProductCardComponent, StoreMapComponent } from '@shared/components';
import { ViewComponent } from 'pc-core';
import { ProductDto, ProductsProxy } from 'pc-proxies';
import { finalize } from 'rxjs/internal/operators/finalize';
import { MenuChatButtonComponent } from './menu-chat-button/menu-chat-button.component';
import { AIService } from '@shared/services';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    IonSpinner,
    ProductCardComponent,
    CategoriesMenuComponent,
    ButtonComponent,
    StoreMapComponent,
    MenuChatButtonComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent extends ViewComponent implements OnInit {

  private readonly _productsProxy = inject(ProductsProxy);
  private readonly _destroyRef = inject(DestroyRef);

  aiService = inject(AIService);

  page: number = 1;
  lastPage: number = 1;
  busy: boolean = false;
  promotions = signal<ProductDto[]>([]);

  ngOnInit(): void {
    this.getPromotions();
  }

  navigateToCategory(id: string): void {
    this.navigation.forward(`category/${id}`);
  }

  getPromotions(): void {
    if (this.page > this.lastPage) return;

    this.busy = true;
    this._productsProxy.getPromotions(this.page)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.busy = false)
      ).subscribe({
        next: (res) => {
          this.page += 1;
          this.lastPage = res.meta.lastPage;
          this.promotions.set([...this.promotions(), ...res.products]);
        }
      });
  }
}
