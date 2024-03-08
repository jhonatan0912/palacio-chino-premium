import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewComponent } from '@core/view-component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HeaderMobileComponent } from '@shared/components/header-mobile/header-mobile.component';
import { HeaderComponent } from '@shared/components/header/header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeaderMobileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends ViewComponent {
  constructor() {
    super();
  }
}
