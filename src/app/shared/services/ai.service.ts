import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GoogleGenerativeAI, Content, ModelParams } from '@google/generative-ai';
import { history } from 'pc-core';
import { ProductsProxy } from 'pc-proxies';

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
export class AiService {

  private readonly _productsProxy = inject(ProductsProxy);
  private readonly _genAI = new GoogleGenerativeAI(environment.tokenAI);
  private readonly _model = this._genAI.getGenerativeModel(params);

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
    const chat = this._model.startChat({
      history: [...this.history],
    });

    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    return text;
  }

}
