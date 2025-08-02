import { Injectable } from '@angular/core';
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;

    await i18next
      .use(HttpBackend)
      .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: true,
        backend: {
          loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
        },
        ns: ['app'],
        defaultNS: 'app',
        interpolation: {
          escapeValue: false,
        },
      });

    this.initialized = true;
  }

  translate = (key: string, options?: any) => i18next.t(key, options)

  changeLanguage = (lng: string) => i18next.changeLanguage(lng)

  get currentLanguage(): string {
    return i18next.language
  }
}