import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from './settings.service';
import { Token } from './token.interface';

/**
 *  The Injectable decorator provides metadata for SessionService so Angular 2 recognizes this 
 *  as a service/provider that other components and modules use.
 */
@Injectable()
export class SessionService {
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {}

  /**
   *  Checks and parses the window's sessionStorage object for a token and returns either the found
   *  access token or an empty string.
   */
  public getAccessToken(): string {
    let response = JSON.parse(window.sessionStorage.getItem('token')) as any;
    return response.access_token || "";
  }

  /**
   *  Checks for the existence of an access token and returns a boolean value.
   */
  public isAuthenticated(): boolean {
    try {
      if (this.getAccessToken() !== "") {
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  /**
   *  Calls the setToken method with no parameters to clear out any existing `token` in sessionStorage.
   *  Next, sets the window's location to the Blackbaud authorization URL and fetches the `SkyApiAppId` and `AuthRedirectUri`
   *  variables from the config file. The browser redirects to the authorization location and then upon success,
   *  redirects to the specified `AuthRedirectUri`.
   */
  public login(): void {
    this.setToken();
    window.location.href = `https://oauth2.sky.blackbaud.com/authorization?client_id=
      ${this.settingsService.get('SkyApiAppId')}
      &response_type=token&redirect_uri=
      ${this.settingsService.get('AuthRedirectUri')}`;
  }

  /**
   *  Directs the browser to the home route and calls for the window to perform a refresh/reload to clear out any cached data.
   */
  public logout() {
    this.setToken();
    this.router.navigate(['/home']);
    window.location.reload();
  }

  /**
   *  setToken takes an optional obj? parameter. If no parameter is provided, it will remove any `token` that may
   *  be in the sessionStorage. If a valid token is provided, it will stringify the token object and save it
   *  in the window's sessionStorage.
   */
  public setToken(obj?: Object) {
    if (!obj) {
      window.sessionStorage.removeItem('token');
    }
    window.sessionStorage.setItem('token', JSON.stringify(obj));
  }
}
