import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  menu = [
    { name: 'Promociones' },
    { name: 'Combos' },
    { name: 'A la carta' },
    { name: 'Banquetes' },
    { name: 'Sopas' },
    { name: 'Bebidas' },
    { name: 'Complementos' },
  ];

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
}
