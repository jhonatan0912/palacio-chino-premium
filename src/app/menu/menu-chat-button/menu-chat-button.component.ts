import { Component } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'menu-chat-button',
  standalone: true,
  imports: [IonIcon,],
  templateUrl: './menu-chat-button.component.html',
  styleUrls: ['./menu-chat-button.component.scss']
})
export class MenuChatButtonComponent { }
