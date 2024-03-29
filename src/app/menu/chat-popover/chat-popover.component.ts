import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from '@core/view-component';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { TitleModalComponent } from '@shared/components/title-modal/title-modal.component';
import { AiService } from '@shared/services/ai.service';

interface Message {
  role: 'user' | 'model';
  message: string;
}

@Component({
  selector: 'app-chat-popover',
  standalone: true,
  imports: [IonSpinner, IonIcon, TitleModalComponent, FormsModule],
  templateUrl: './chat-popover.component.html',
  styleUrls: ['./chat-popover.component.scss']
})
export class ChatPopoverComponent extends ViewComponent implements AfterViewInit {

  aiService = inject(AiService);

  busy: boolean = false;
  prompt: string = '';

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scroll(), 100);
  }

  onDismiss(): void {
    this.popup.dismiss('cancel');
  }

  async onChat(): Promise<void> {
    if (this.prompt.trim().length === 0) return;
    
    const message = this.prompt;
    this.aiService.messages.update((prev) => [...prev, { role: 'user', message }]);
    this.scroll();
    this.busy = true;
    this.prompt = '';

    await this.aiService.onChat(message)
      .then((res) => {
        this.busy = false;
        this.aiService.messages.update((prev) => [...prev, { role: 'model', message: res }]);
        this.scroll();
      });
  }

  private scroll(): void {
    const history: HTMLElement = document.getElementById('chat__history')!;
    history.scrollTo({ top: history.scrollHeight, behavior: 'smooth' });
  }
}
