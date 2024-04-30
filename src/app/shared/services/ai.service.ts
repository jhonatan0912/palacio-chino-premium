import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Content, GoogleGenerativeAI, ModelParams } from '@google/generative-ai';
import { ViewComponent, history } from 'pc-core';
import { ProductsProxy } from 'pc-proxies';
import { ChatPopoverComponent } from '../../menu/chat-popover/chat-popover.component';

const params: ModelParams = {
  model: 'gemini-pro',
};

interface Message {
  role: 'user' | 'model';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService extends ViewComponent {

  private readonly _productsProxy = inject(ProductsProxy);
  private readonly _genAI = new GoogleGenerativeAI(environment.tokenAI);
  private readonly _model = this._genAI.getGenerativeModel(params);

  private history: Content[] = history;

  messages = signal<Message[]>([
    { role: 'model', message: '¡Hola! ¿En qué puedo ayudarte? 😊' },
  ]);

  constructor() {
    super();
    this.init();
  }

  init(): void {
    this._productsProxy.getForPrompt()
      .subscribe({
        next: (products) => {
          const newContent: Content[] = [
            {
              role: 'user',
              parts: [{ text: 'productos' }]
            },
            {
              role: 'model',
              parts: [{ text: JSON.stringify(products) }]
            }
          ];
          this.history.push(...newContent);
        }
      });
  }

  onOpenChat(event: Event): void {
    if (!this.session.user) {
      this.navigation.forward('/auth/login');
      return;
    }
    this.popup.showWithData({
      component: ChatPopoverComponent,
      event: event,
      arrow: false,
      side: 'top',
      showBackdrop: false,
      alignment: 'end',
      cssClass: ['chat-popover']
    });
  }

  async onChat(msg: string): Promise<string> {
    const chat = this._model.startChat({
      history: [...this.history],
    });

    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    return text;
  }

}
