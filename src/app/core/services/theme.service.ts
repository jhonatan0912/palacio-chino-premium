import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {

  theme = signal<Theme>('light');

  init(): void {
    const theme = localStorage.getItem('theme') as Theme;
    const body = document.querySelector('body');
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!theme) {
      if (isDark) {
        this.setTheme('dark', body);
      } else {
        this.setTheme('light', body);
      }
    } else {
      this.setTheme(theme, body);
    }
  }

  changeTheme(theme: Theme): void {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const body = document.querySelector('body');
    this.setTheme(newTheme, body);
  }

  private setTheme(theme: Theme, body: HTMLElement | null): void {
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
    body?.classList.remove(oppositeTheme);
    body?.classList.add(theme);
    localStorage.setItem('theme', theme);
    this.theme.set(theme);
  }

}
