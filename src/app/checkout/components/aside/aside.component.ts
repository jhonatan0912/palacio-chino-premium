import { Component } from '@angular/core';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'checkout-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent extends ViewComponent {

  constructor() {
    super();
  }

  onBack(): void {
    this.navigation.back('/menu');
  }
}
