import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from './components/aside/aside.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterOutlet, AsideComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
