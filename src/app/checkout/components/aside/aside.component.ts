import { Component } from '@angular/core';
import { ViewComponent } from 'pc-core';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'checkout-aside',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent extends ViewComponent {

  constructor() {
    super();
  }

  onBack(): void {
    this.navigation.back('/');
  }
}
