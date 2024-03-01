import { Component } from '@angular/core';
import { ButtonComponent } from '@lib/button/button.component';
import { ViewComponent } from '@core/view-component';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent extends ViewComponent {

  save() {
    this.navigation.forward('/');
  }

}
