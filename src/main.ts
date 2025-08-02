import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
