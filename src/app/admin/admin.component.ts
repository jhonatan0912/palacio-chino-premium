import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminWebsocketsService } from './services/websockets.service';
import { IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [IonTitle, RouterOutlet, SidebarComponent, NgClass],
  providers: [AdminWebsocketsService],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  private readonly _websocketsService = inject(AdminWebsocketsService);

  expanded: boolean = true;

  ngOnInit(): void {
    this._websocketsService.init();
  }
}
