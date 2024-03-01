import { Component, OnInit, inject, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CategoryDto } from '@shared/proxies/categories.proxies';
import { CategoriesService } from '@shared/services/categories.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  private categoriesService = inject(CategoriesService);

  account = [
    { name: 'Mis ordenes' },
    { name: 'Mis direcciones' },
    { name: 'Mi información' },
  ];

  information = [
    { name: 'Sobre nosotros' },
    { name: 'Nuestro local' },
    { name: 'Zonas de reparto' },
    { name: 'Contáctanos' },
  ];

  categories = signal<CategoryDto[]>([]);

  get year(): string {
    return new Date().getFullYear().toString();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories.set(this.categoriesService.categories());
  }

}
