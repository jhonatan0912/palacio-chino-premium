import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WebsocketsService } from './services/websockets.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, AdminHeaderComponent, NgClass],
  providers: [WebsocketsService],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  private readonly _websocketsService = inject(WebsocketsService);

  expanded: boolean = true;

  ngOnInit(): void {
    this._websocketsService.init();
  }
}
