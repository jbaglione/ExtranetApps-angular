import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    heroes: 'heroes',
    error404: '404'
  },
  endpoints: {
    //  //localhost
    //  extranet: 'https://localhost:5001/api/Hallazgos',
    //  upload: 'https://localhost:5001/api/Upload'

    // //Produccion
    // extranet: 'http://paramedicapps.com.ar:5566/api/Hallazgos',
    // upload: 'http://paramedicapps.com.ar:5566/api/Upload'

    // Server Local Pilar
    extranet: 'http://192.168.5.95:5566/api/Hallazgos',
    upload: 'http://192.168.5.95:5566/api/Upload'

  },
  // votesLimit: 3,
  // topHeroesLimit: 4,
  snackBarDuration: 3000,
  // repositoryURL: 'https://github.com/ismaestro/angular6-example-app'
};
