import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfiguration } from './app-configuration.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingsService {
  private settings: AppConfiguration;

  constructor(private http: Http) {}

  public get(key: string) {
    return this.settings[key] || false;
  }

  public getConfigFile() {
    if (this.settings) {
      return Promise.resolve(this.settings);
    } else {
      return this.http.get('/data/config.json')
        .toPromise()
        .then(response => {
          this.settings = response.json();
          return this.settings;
        })
        .catch((error) => {
          console.log('ERROR:', error);
        });
    }
  }
}
