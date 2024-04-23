import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonSpinner } from "@ionic/angular/standalone";
import { TitleModalComponent } from '@shared/components/title-modal/title-modal.component';
import { AiService } from '@shared/services/ai.service';
import { ViewComponent } from 'pc-core';


@Component({
  selector: 'app-chat-popover',
  standalone: true,
  imports: [IonSpinner, IonIcon, TitleModalComponent, FormsModule],
  templateUrl: './chat-popover.component.html',
  styleUrls: ['./chat-popover.component.scss']
})
export class ChatPopoverComponent extends ViewComponent implements AfterViewInit {

  input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  aiService = inject(AiService);

  busy: boolean = false;
  prompt: string = '';

  ngAfterViewInit(): void {
    setTimeout(() => this.scroll(), 100);
    setTimeout(() => this.input().nativeElement.focus(), 1000);
  }

  onDismiss(): void {
    this.popup.dismiss('cancel');
  }

  onChat(): void {
    if (this.prompt.trim().length === 0) return;

    const message = this.prompt;
    this.aiService.messages.update((prev) => [...prev, { role: 'user', message }]);
    this.prompt = '';
    setTimeout(() => this.scroll(), 0);
    this.busy = true;

    this.aiService.onChat(message)
      .then((res) => {
        this.aiService.messages.update((prev) => [...prev, { role: 'model', message: res }]);
        setTimeout(() => this.scroll(), 500);
      })
      .finally(() => {
        this.busy = false;
      });
  }

  private scroll(): void {
    const history: HTMLElement = document.getElementById('chat__history')!;
    history.scrollTo({ top: history.scrollHeight, behavior: 'smooth' });
  }
}
