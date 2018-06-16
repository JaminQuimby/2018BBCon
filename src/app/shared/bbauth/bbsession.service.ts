import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BBSettingsService } from './bbsettings.service';

@Injectable()
export class BBSessionService {
  constructor(
    private router: Router,
    private settingsService: BBSettingsService
  ) { }

  public getAccessToken(): string {
    let response = JSON.parse(window.sessionStorage.getItem('token')) as any;
    return response && response.access_token || '';
  }

  public isAuthenticated(): boolean {
    try {
      return this.getAccessToken() !== '' && true;
    } catch (e) {
      return false;
    }
  }

  public login(): void {
    this.setToken();
    const oAuthUrl = 'https://oauth2.sky.blackbaud.com/authorization/';
    const clientId = this.settingsService.get('SkyApiAppId');
    const redirectUrl = this.settingsService.get('AuthRedirectUri');

    window.location.href =
      `${oAuthUrl}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUrl}`;
  }

  public logout() {
    this.setToken();
    this.router.navigate(['/home']);
    window.location.reload();
  }

  public setToken(obj?: Object) {
    const session = window.sessionStorage;
    !obj ? session.removeItem('token') : session.setItem('token', JSON.stringify(obj));
  }
}
