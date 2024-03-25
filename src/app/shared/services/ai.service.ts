import { Injectable, signal } from '@angular/core';
import { history } from '@core/utils/history.prompts';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'model';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  messages = signal<Message[]>([]);

  async onChat(msg: string): Promise<string> {
    const genAI = new GoogleGenerativeAI('AIzaSyA1PWJkJ3qa5kN9ImCGGjEwiPiZ5o_a-Rc');

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 100
      }
    });

    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    console.log(text);
    return text;
  }

}
