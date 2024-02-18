import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { IonRouterOutlet } from "@ionic/angular/standalone";
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonRouterOutlet, HeaderComponent, RouterOutlet, FooterComponent, SideMenuComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent { }
