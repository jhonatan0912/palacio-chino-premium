import { Injectable, signal } from '@angular/core';
import { history } from '@core/utils/history.prompts';
import { environment } from '@environments/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'model';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  messages = signal<Message[]>([
    { role: 'model', message: '¡Hola! ¿En qué puedo ayudarte hoy? 😊' },
  ]);

  async onChat(msg: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(environment.tokenAI);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    console.log(text);
    return text;
  }

}
