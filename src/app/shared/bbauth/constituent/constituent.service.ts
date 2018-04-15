import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 *  Pulls in the rxjs toPromise method so that HTTP requests can use Promises.
 *    NOTE: Angular 2 supports the use of observables, but we use Promises for simplicity.
 */
import 'rxjs/add/operator/toPromise';

import { SessionService } from '../../shared/session.service';
import { SettingsService } from '../../shared/settings.service';

@Injectable()
export class ConstituentService {
  private url: string = 'https://api.sky.blackbaud.com/constituent/v1/constituents/';

  constructor(

    /**
     * Pulls in the Http service from the @angular/http library to provide access to the HTTP methods.
     */
    private http: Http,
    private sessionService: SessionService,
    private settingsService: SettingsService) { }

  public getById(id: number): Promise<any> {

    /**
     *  The SKY API endpoints require a header with all requests. The header must contain 
     *  the `bb-api-subscription-key` property from the config file and an `Authorization` key.
     *  the `Authorization` key's value must start with the string 'Bearer' followed by a space and
     *  then the token that users receive when they authenticate.
     *
     *  To attach a header to `GET` requests, we use the Headers and Options constructors
     *  from the @angular/http library. We create our variables as `new` instances of these constructors
     *  and pass in the values we need.
     */
    let headers = new Headers({
      'bb-api-subscription-key': this.settingsService.get('SkyApiSubscriptionKey'),
      'Authorization': 'Bearer ' + this.sessionService.getAccessToken()
    });

    /**
     *  New RequestOptions formats the header object in a way that allows HTTP to attach the header to the HTTP request.
     */
    let options = new RequestOptions({ headers: headers });

    if (this.sessionService.isAuthenticated()) {

      /**
      *  `GET` requests can't contain data like the other HTTP methods. So the formatted `options` variable needs to be passed in 
      *  as the second parameter to the `GET` request. Without these headers, SKY API cannot authenticate the request.
      */
      return this.http.get(this.url + id, options)
        .toPromise()
        .then((data: any) => JSON.parse(data._body))
        .catch(this.handleError);
    } else {
      return Promise.reject({});
    }
  }

  private handleError(error: any) {
    console.log(error.message || error);
    return Promise.reject(error);
  }
}
