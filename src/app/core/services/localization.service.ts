import { Injectable } from '@angular/core';

export type Language = 'en_US' | 'es_ES';

@Injectable({
  providedIn: 'root',
})
export class AppLocalizationService {

  get language(): Language {
    return localStorage.getItem('language') as Language;
  }

  init(): void {
    const languageInStorage = localStorage.getItem('language');
    if (!languageInStorage) {
      localStorage.setItem('language', 'es_ES');
      const doc = document.querySelector('html') as HTMLElement;
      doc.lang = 'es_ES';
    } else {
      const doc = document.querySelector('html') as HTMLElement;
      doc.lang = languageInStorage;
    }
  }

  changeLanguage(language: Language): void {
    localStorage.setItem('language', language);
  }

  localize(term: string): string {
    return this.language === 'es_ES'
      ? (window as any).APP.config.es[term]
      : (window as any).APP.config.en[term];
  }
}
