import { APP_INITIALIZER, ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ActionReducer, provideState, provideStore } from '@ngrx/store';
import { gameFeature } from './store/game/game.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { playerFeature } from './store/player/player.reducer';
import { provideHttpClient } from '@angular/common/http';
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return localStorageSync({ keys: ['game', 'player'], rehydrate: true, })(reducer);
}

export function i18nextInitializer() {
  return () =>
    i18next
      .use(HttpBackend)
      .init({
        lng: 'en',
        fallbackLng: 'en',
        backend: {
          loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
        },
        ns: ['app'],
        defaultNS: 'app',
        interpolation: {
          escapeValue: false,
        },
      });
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore([], { metaReducers: [localStorageSyncReducer] }),
    provideState(gameFeature),
    provideState(playerFeature),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: i18nextInitializer,
      multi: true,
    },
]
};
