import { Component } from '@angular/core';
import { ViewComponent } from 'pc-core';

@Component({
  selector: 'galery',
  standalone: true,
  imports: [],
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.scss']
})
export class GaleryComponent extends ViewComponent {

  onHome(): void {
    this.navigation.forward('/');
  }
}
