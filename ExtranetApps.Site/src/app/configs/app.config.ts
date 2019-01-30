import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    heroes: 'heroes',
    error404: '404'
  },
  endpoints: {
    //  //localhost
    api: 'https://localhost:5001/api/',
    security: 'https://localhost:5002/security/',
    oldExranet: 'http://localhost:2128/',

    // Produccion
    // site: http://paramedicapps.com.ar:5567/
    // api: 'http://paramedicapps.com.ar:5566/api/',
    // security: 'http://paramedicapps.com.ar:5568/security/',
    // oldExranet: 'http://paramedicapps.com.ar:58885/',

    // Server Local Pilar
    // api: 'http://192.168.5.95:5566/api/',
  },
  // votesLimit: 3,
  // topHeroesLimit: 4,
  snackBarDuration: 3500,
  // repositoryURL: 'https://github.com/ismaestro/angular6-example-app'
};
