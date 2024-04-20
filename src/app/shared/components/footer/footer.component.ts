import { Component, OnInit, inject, signal } from '@angular/core';
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
export class FooterComponent extends ViewComponent implements OnInit {
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
        this.navigation.forward('/establishments')
      }
    },
    {
      name: 'Galeria',
      method: () => {
        this.navigation.forward('/galery')
      }
    },
  ];
  categories = signal<CategoryDto[]>([]);

  get year(): string {
    return new Date().getFullYear().toString();
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories.set(this.categoriesService.categories());
  }

}
