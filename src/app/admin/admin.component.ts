import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WebsocketsService } from './services/websockets.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NgClass],
  providers: [WebsocketsService],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  private readonly websocketsService = inject(WebsocketsService);

  expanded: boolean = true;

  ngOnInit(): void {
    this.websocketsService.init();
  }
}
