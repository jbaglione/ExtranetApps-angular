import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    heroes: 'heroes',
    error404: '404'
  },
  endpoints: {
    pami: 'http://localhost:64997/Api/traslado/',
    extranet: 'https://localhost:5001/api/ExtranetApps'
  },
  // votesLimit: 3,
  // topHeroesLimit: 4,
  // snackBarDuration: 3000,
  // repositoryURL: 'https://github.com/ismaestro/angular6-example-app'
};
