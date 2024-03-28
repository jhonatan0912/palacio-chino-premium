import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonIcon } from "@ionic/angular/standalone";
import { AuthAsideComponent } from './components/aside/aside.component';

@Component({
  selector: 'auth',
  standalone: true,
  imports: [IonIcon, AuthAsideComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent { }