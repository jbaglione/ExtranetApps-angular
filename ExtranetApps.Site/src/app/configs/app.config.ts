import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    heroes: 'heroes',
    error404: '404'
  },
  endpoints: {
    //  //localhost
    extranet: 'https://localhost:5001/api/',
    // upload: 'https://localhost:5001/api/Upload',
    security: 'https://localhost:5002/Security/Users/',
    oldExranet: 'http://localhost:2128/',

    // //Produccion
    // extranet: 'http://paramedicapps.com.ar:5566/api/Hallazgos',
    // upload: 'http://paramedicapps.com.ar:5566/api/Upload'
    // oldExranet: 'http://paramedicapps.com.ar:58885/',

    // Server Local Pilar
    // extranet: 'http://192.168.5.95:5566/api/',
    upload: 'http://192.168.5.95:5566/api/Upload'
  },
  // votesLimit: 3,
  // topHeroesLimit: 4,
  snackBarDuration: 3500,
  // repositoryURL: 'https://github.com/ismaestro/angular6-example-app'
};
