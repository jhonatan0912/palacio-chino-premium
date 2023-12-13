import { Component } from '@angular/core';
import { ButtonComponent } from '@lib/button/button.component';
import { AsideComponent } from '../components/aside/aside.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AsideComponent, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
