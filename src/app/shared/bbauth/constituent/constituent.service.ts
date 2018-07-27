import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BBSessionService } from '../bbsession.service';
import { BBSettingsService } from '../bbsettings.service';

@Injectable()
export class ConstituentService {
  private url: string = 'https://api.sky.blackbaud.com/constituent/v1/constituents/';
  private headers = new Headers({
    'bb-api-subscription-key': this.settingsService.get('SkyApiSubscriptionKey'),
    'Authorization': 'Bearer ' + this.sessionService.getAccessToken()
  });
  private options = new RequestOptions({ headers: this.headers });
  constructor(
    private http: Http,
    private sessionService: BBSessionService,
    private settingsService: BBSettingsService
  ) { }

  public getById(id: number): Promise<any> {
    return this.constituentData(id, `${this.url}${id}`);
  }

  public getLatestVolunteer(id: number): Promise<any> {
    return this.constituentData(id, `${this.url}${id}/givingsummary/latest`);
  }

  public async getOnlinePresenceList(id: number): Promise<any> {
    let list = await this.constituentData(id, `${this.url}${id}/onlinepresences`);
    return list.value;
  }

  private async constituentData(id: number, url: string) {
    if (!this.sessionService.isAuthenticated()) { return this.handleError('Not Authenticated'); }
    try {
      const data: any = await this.http.get(url, this.options).toPromise();
      return JSON.parse(data._body);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.log(error.message || error);
    return Promise.reject(error);
  }
}
