import { Component, computed, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CategoriesService } from '@shared/services/categories.service';
import { ViewComponent } from 'pc-core';
import { CategoryDto } from 'pc-proxies';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent extends ViewComponent {
  private categoriesService = inject(CategoriesService);

  account = [
    {
      name: 'Mis ordenes',
      method: () => {
        if (!this.session.user) {
          this.navigation.forward('/auth/login');
          return;
        }
        this.navigation.forward('/profile/orders');
      }
    },
    {
      name: 'Mis direcciones',
      method: () => {
        if (!this.session.user) {
          this.navigation.forward('/auth/login');
          return;
        }
        this.navigation.forward('/profile/addresses');
      }
    },
    {
      name: 'Mi información',
      method: () => {
        if (!this.session.user) {
          this.navigation.forward('/auth/login');
          return;
        }
        this.navigation.forward('/profile/personal-information');
      }
    },
  ];
  information = [
    {
      name: 'Nuestro local',
      method: () => {
        this.navigation.forward('/establishments');
      }
    },
    {
      name: 'Galeria',
      method: () => {
        this.navigation.forward('/galery');
      }
    },
  ];
  categories = computed<CategoryDto[]>(() => this.categoriesService.categories());

  get year(): string {
    return new Date().getFullYear().toString();
  }

  onCategory(id: string): void {
    this.navigation.forward(`/category/${id}`);
  }
}
