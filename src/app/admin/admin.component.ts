import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { Screen, ScreenService } from '@core/services/screen.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NgClass],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  private screenService = inject(ScreenService);

  expanded: boolean = true;

  screen!: Screen;

  constructor() {
    this.screen = this.screenService.screen;
  }

  ngOnInit() { }

}
