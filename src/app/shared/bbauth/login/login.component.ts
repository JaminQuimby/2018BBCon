import { Component } from '@angular/core';
import { BBSessionService } from '../bbsession.service';

@Component({
  selector: 'bb-login',
  template: require('./login.component.html'),
  styles: [`button {
    margin-top: 10px;
  }`]
})
export class BbLoginComponent {
  constructor (
    private sessionService: BBSessionService
  ) {}

  public get loggedIn(): boolean {
    return this.sessionService.isAuthenticated();
  }

  public login(): void {
    this.sessionService.login();
  }

  public logout(): void {
    this.sessionService.logout();
  }
}
