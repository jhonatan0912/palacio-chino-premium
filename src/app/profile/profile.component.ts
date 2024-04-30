import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonRouterOutlet } from "@ionic/angular/standalone";
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { WebsocketsService } from './services/websockets.service';
import { FooterComponent, HeaderComponent } from '@shared/components';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonRouterOutlet, HeaderComponent, RouterOutlet, FooterComponent, SideMenuComponent],
  providers: [WebsocketsService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  private readonly websocketsService = inject(WebsocketsService);

  constructor() {
    this.websocketsService.init();
  }

}
