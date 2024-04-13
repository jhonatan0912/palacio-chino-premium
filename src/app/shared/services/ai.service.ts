import { Injectable, inject, signal } from '@angular/core';
import { history } from '@core/utils/history.prompts';
import { environment } from '@environments/environment';
import { GoogleGenerativeAI, Content } from '@google/generative-ai';
import { ProductsProxy } from '@shared/proxies';

interface Message {
  role: 'user' | 'model';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private readonly _productsProxy = inject(ProductsProxy);

  private history: Content[] = history;

  messages = signal<Message[]>([
    { role: 'model', message: '¡Hola! ¿En qué puedo ayudarte hoy? 😊' },
  ]);

  constructor() {
    this.init();
  }

  init(): void {
    this._productsProxy.getForPrompt()
      .subscribe({
        next: (products) => {
          const newContent: Content[] = [
            {
              role: 'user',
              parts: [{ text: 'dime los productos' }]
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

  async onChat(msg: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(environment.tokenAI);

    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
    });
    const chat = model.startChat({
      history: [...this.history],
    });

    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    return text;
  }

}
